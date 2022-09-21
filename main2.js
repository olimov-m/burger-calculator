const products = {
    plainBurger: {
      name: 'Гамбургер простой' ,
      price: 10000,
      kcall: 800,
      amount: 0,
      Summ: function(){return this.amount * this.price},
      Kcall: function(){return this.amount * this.kcall},
    },
    freshBurger: {
      name: 'Гамбургер FRESH ' ,
      price: 20500,
      kcall: 1150,
      amount: 0,
      Summ: function(){return this.amount * this.price},
      Kcall: function(){return this.amount * this.kcall},
    },
    freshCombo: {
      name: 'FRESH COMBO' ,
      price: 31900,
      kcall: 1420,
      amount: 0,
      Summ: function(){return this.amount * this.price},
      Kcall: function(){return this.amount * this.kcall},
    },
  }
  
  const extraProduct = {
    doubleMayonnaise: {
      name:'Double Mayonaise',
      price: 500,
      kcall: 300,
    },
    lettuce: {
      name:'Salat',
      price: 300,
      kcall: 20,
    },
    cheese: {
      name:'Cheeze',
      price: 800,
      kcall: 250,
    }
  }
  
  const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
  const checkItems = document.querySelectorAll('.main__product-checkbox');  
  
  btnPlusOrMinus.forEach((btn, key)=>{
    const parent = btn.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const outAmount = parent.querySelector('.main__product-num');
    const outPrice = parent.querySelector('.main__product-price span');
    const outKcall = parent.querySelector('.main__product-kcall span');

    btn.addEventListener('click', function(){
      const symbol = btn.getAttribute('data-symbol');
  
      if(symbol == '+' && products[parentId].amount < 100){
        products[parentId].amount ++
      }else if(symbol == '-' && products[parentId].amount > 0){
        products[parentId].amount --
      }
  
      outAmount.innerHTML = products[parentId].amount;
      outPrice.innerHTML = products[parentId].Summ();
      outKcall.innerHTML = products[parentId].Kcall();
    }) 
  })
  checkItems.forEach((check) => {
    const parent = check.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const outPrice = parent.querySelector('.main__product-price span');
    const outKcall = parent.querySelector('.main__product-kcall span');

    check.addEventListener('click', function(){
      const dataExtra = check.getAttribute('data-extra');
      products[parentId][dataExtra] = check.checked;

      if(products[parentId][dataExtra] === true){
        products[parentId].price += extraProduct[dataExtra].price;
        products[parentId].kcall += extraProduct[dataExtra].kcall;
      }else{
        products[parentId].price -= extraProduct[dataExtra].price;
        products[parentId].kcall -= extraProduct[dataExtra].kcall;
      }
      outPrice.innerHTML = products[parentId].Summ();
      outKcall.innerHTML = products[parentId].Kcall();
    })
  })

const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptOut = document.querySelector('.receipt__window-out');
const receiptBtn = document.querySelector('.receipt__window-btn');
const addCart = document.querySelector('.addCart');

let arrProducts = [];
let totalName = '';
let totalPrice = 0;
let totalKcall = 0;

addCart.addEventListener('click', function(){
    for(const key in products){
        const pObj = products[key]
        if(pObj.amount > 0){
            arrProducts.push(pObj);
            pObj.name += ` = ${pObj.amount}`;
            for(const info in pObj){
                if(pObj[info] === true){
                    pObj.name += `\n ${extraProduct[info].name}`
                }
            }
            pObj.name += ` \n P2rice: ${pObj.Summ()} \n Kcallories: ${pObj.Kcall()}`;
        }
    }
    arrProducts.forEach(obj =>{
        totalName += ` \n ${obj.name}\n`;
        totalPrice += obj.Summ();
        totalKcall += obj.Kcall();
    })

    receiptOut.innerHTML = ` My orders: \n${totalName}\n Total price with delivery: ${totalPrice + 9000} UZS \n Delivery cost 9000 UZS \n Total Kcallories: ${totalKcall}`;


    receipt.style.display = 'flex';
    setTimeout(() =>{
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = '20%';
    }, 300);
})
receiptBtn.addEventListener('click', function(){
    location.reload();
})
  
  