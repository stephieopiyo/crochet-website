const burger = document.querySelector('.burger i');
const nav = document.querySelector('nav ul');
const carticon = document.querySelector('.carticon');
const closeCart = document.querySelector('.closeCart');
const cartOverlay = document.querySelector('.shopping-cart-overlay');
const myCart = document.querySelector('.shopping-cart');
const cartItems = document.querySelector('.cartitems');
const totalcartitems = document.querySelector('.badge');

  function toggleNav() {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
    nav.classList.toggle('active');
  }
  
  if (burger) {
    burger.addEventListener('click', toggleNav, false);
  }
  
  
  function hideCart(){
    closeCart.addEventListener('click', function(event){
      event.preventDefault();
      cartOverlay.classList.remove('transparentBcg');
      myCart.classList.remove('showCart');
    });
  }
  hideCart();
  
  function showCart(){
    carticon.addEventListener('click', function(event){
      event.preventDefault();
      cartOverlay.classList.add('transparentBcg');
      myCart.classList.add('showCart');
    });
  }
  showCart();
  
  
  function addToCart(){
    let cartbtns = document.querySelectorAll('.shopitem');
    cartbtns.forEach(function (cartbtn){
      cartbtn.addEventListener('click', function(event){
        let btn = event.target;
        
        let item = {};
        let img = btn.parentElement.children[0].src;
        let title = btn.parentElement.children[1].textContent;
        let price = btn.parentElement.children[2].textContent;
        
        item.title = title;
        item.price = price;
        item.img = img;
        
        cart.push(item);
      
       const cartRow = document.createElement('div');
            
       cartRow.classList.add('cartrow');
            
       cartRow.innerHTML = `
          <div class="cartitem cartcol">
            <img class="cartitemimage" src="${item.img}" width="100" height="100">
            <span class="cartitemtitle">${item.title}</span>
          </div>
          <span class="cartprice cartcol">${item.price}</span>
          <div class="cartquantity cartcol">
            <input class="cartquantityinput" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
          </div>
          `;
          
          cartItems.appendChild(cartRow);
          alert('Item added to cart');
          let newTotal = Number(totalcartitems.innerText) + 1;
          totalcartitems.innerText = newTotal;
          
          updateCart();
          removeFromCart();
          quantityChange();
      });
    });
  }
  
  addToCart();
  
  function updateCart() {
    const cartItemContainer = document.querySelector('.cartitems');
    const cartRows = cartItemContainer.querySelectorAll('.cartrow');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.querySelector('.cartprice');
        let quantityElement = cartRow.querySelector('.cartquantityinput');
        let price = Number(priceElement.textContent.replace('Kshs', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = document.querySelector('.carttotalprice').innerText = 'Kshs' + total;
    console.log(total);
  }
  
  function quantityChange(){
    let quantityInputs = document.querySelectorAll('.cartquantityinput');
    quantityInputs.forEach(function(quantityInput){
      quantityInput.addEventListener('change', function(event){
        let quantity = event.target;
        
        if(isNaN(quantity.value) || quantity <=0){
          quantity.value = 1;
        }
        updateCart();
      });
    });
  }
  
  
  function removeFromCart(){
    let deletebtns = document.querySelectorAll('.btn-danger');
    deletebtns.forEach(function(deletebtn){
      deletebtn.addEventListener('click', function(event){
        let delbtn = event.target;
        delbtn.parentElement.parentElement.remove();
        let newTotal = Number(totalcartitems.innerText) - 1;
        totalcartitems.innerText = newTotal;
        if( newTotal < 0){
          totalcartitems.innerText = 0;
        }
        updateCart();
      });
    });
  }
  