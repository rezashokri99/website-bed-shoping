// access //

// access to the data
import productsData from "./products.js";


// access to the cart btn
let cartBtn = document.querySelector(".cart-btn");

// access to the cart modal
let cartModal = document.querySelector(".cart-modal");

// accss to the backdrop
let backdrop = document.querySelector(".backdrop");

// access to the confirm cart
let confirmCart = document.querySelector(".confirm-cart");

// access to the products container
let productContainer = document.querySelector(".products");

// access to the cart content
let cartContent = document.querySelector(".cart-content");

// access to clear cart in modal cart
let clearCart = document.querySelector(".clear-cart");

// access to the total price 
let totalPrice = document.querySelector(".total-price span");

// access to the cart item
let cartItem = document.querySelector(".cart-item");



// access to the cart data
let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// access to the count product
let countitems = JSON.parse(localStorage.getItem("countItems"))
  ? JSON.parse(localStorage.getItem("countItems"))
  : [];





// classes //

// class get products data
class GetProducts {
  getProducts() {
    return productsData;
  }
}

// class append products data to ui
class Ui {

  // add product to ui
  addToUi(products) {
    // products loop
    products.forEach((product) => {
      // build product (html)
      let buildProduct = `
            <div class="product">
                
                <img src=${product.imageUrl} alt="product">
                
                <div class="information">
                    <span class="nameProduct">${product.title}</span>
                    <span class="price">${product.price} $</span>
                </div>
                
                <a href="#" class="addToCart" data-id=${product.id}><i class="fas fa-shopping-cart"></i>add to cart</a>
            </div>
            `;
      // add product to ui (product container)
      productContainer.innerHTML += buildProduct;
    });
  }


  // add to cart buttons
  getAddToCartBtns() {
    // get all buttons add to cart
    let addToCartBtns = document.querySelectorAll(".addToCart");

    // convert nodelist to array
    let newAddToCartBtns = [...addToCartBtns];

    // all add to cart buttons btn loop
    newAddToCartBtns.map((productBtn) => {
      // add event listner to all button
      productBtn.addEventListener("click", (event) => {
        event.preventDefault();

        let isInCart;
        // if cart isn't null
        if (cart) {
          // find event targat id in cart
          isInCart = cart.find(
            (product) => product.id == event.target.dataset.id
          );
        }

        // if isInCart isn't null
        if (isInCart) {
          // replace text to In Cart
          productBtn.innerText = "In Cart";
          // desabled button
          productBtn.disabled = true;
        }

        // get all products of local storage for check
        let productsLs = JSON.parse(localStorage.getItem("products"));

        let result;
        // if cart isn't null
        if (cart) {
          // find event target id to cart modal
          result = cart.find((p) => p.id == event.target.dataset.id);
        }

        // if result isn't null
        if (result) {
          // get all buttons add to cart
          let addToCartBtns = document.querySelectorAll(".addToCart");
          // convert nodelist to array
          let newAddToCartBtns = [...addToCartBtns];

          // do loop on newAddToCartBtns
          newAddToCartBtns.map((btn) => {
            // btn data-id == event target id
            if (btn.dataset.id == event.target.dataset.id) {
              // build i
              let i = `<i class="fas fa-shopping-cart"></i>`;
              // replace btn text
              btn.innerHTML = i + "add to cart";

              btn.disabled = false;
            }
          });

          // build newCart
          let newCart = JSON.parse(localStorage.getItem("cart"));

          // do loop on newCart
          newCart.forEach((p, index) => {
            // if event target id == product id
            if (event.target.dataset.id == p.id) {
              // remove this product in newCart
              newCart.splice(index, 1);
            }
          });

          // add newCart to local storage
          localStorage.setItem("cart", JSON.stringify(newCart));

          // cartContent = ""
          cartContent.innerHTML = "";

          // call addProductToCart for reload cart container
          ui.addProductToCart();

          // loop on countitems for delete item in countitems
          countitems.forEach((item, index) => {
            if (item.id == event.target.dataset.id) {
              countitems.splice(index, 1);
            }
          });

          // add new countitems to localStorage
          localStorage.setItem("countItems", JSON.stringify(countitems));

          // update total price after remove item 
          this.updateTotalPrice();
          return;
        }

        // all products loop
        productsLs.map((product) => {
          // if product id == event target id
          if (product.id == event.target.dataset.id) {
            // build item for append to cart
            let add = `
                            <div class="cart" data-id=${product.id}>
                                
                                <div class="cart-item-img">
                                    <img src=${product.imageUrl} alt="product">
                                </div>
                                
                                <div class="cart-item-information">
                                    <p class="cart-item-name">${product.title}</p>
                                    <p class="cart-item-price" data-id=${product.id}><span>${product.price}</span> $</p>
                                </div>
                                
                                <div class="cart-item-conteoller">
                                    <i class="fas fa-chevron-up" data-id=${product.id}></i>
                                    <p data-id=${product.id}>1</p>
                                    <i class="fas fa-chevron-down" data-id=${product.id}></i>
                                </div>
                                
                                <div class="cart-item-clear">
                                    <i class="fas fa-trash" data-id=${product.id}></i>
                                </div>
                            </div>
                        `;

            // add item to cart
            cartContent.innerHTML += add;

            // if cart is null
            if (!cart) {
              // convert cart to []
              cart = [];
            }
            // add product to cart
            cart.push(product);

            // add cart to local storage
            localStorage.setItem("cart", JSON.stringify(cart));

            // loop on countitems for addn't item Repetitious
            countitems.forEach((item, index) => {
              if (item.id == event.target.dataset.id) {
                countitems.splice(index, 1);
              }
            });

            // build item for add to localStorage
            let item = {
              id: event.target.dataset.id,
              count: 1,
            };

            // add new item to countitems
            countitems.push(item);

            // add new countitems to localStorage
            localStorage.setItem("countItems", JSON.stringify(countitems));

            // update total price
            this.updateTotalPrice();
          }
        });

        // call convertBtnToInCart for convert button text
        ui.convertBtnToInCart();

        this.conteoller();
      });
    });
  }

  convertBtnToInCart() {
    // get all buttons add to cart
    let addToCartBtns = document.querySelectorAll(".addToCart");

    // convert nodelist to array
    let newAddToCartBtns = [...addToCartBtns];

    // loop on newAddToCartBtns
    newAddToCartBtns.map((btn) => {
      // loop on cart
      cart.map((product) => {
        // if product id == btn data-id
        if (product.id == btn.dataset.id) {
          // replace button text to In Cart
          btn.innerText = "In Cart";
          // disabled button
          btn.disabled = true;
        }
      });
    });
  }

  addProductToCart() {
    // get cart data of localStorage
    cart = JSON.parse(localStorage.getItem("cart"));

    countitems.forEach((item) => {});

    // if cart isn't null
    if (cart) {
      // do loop on cart
      cart.map((product) => {
        let item = countitems.find((item) => item.id == product.id);

        let count = item ? item.count : 1;

        // build item for append to cart
        let add = `
                <div class="cart" data-id=${product.id}>
                    
                    <div class="cart-item-img">
                        <img src=${product.imageUrl} alt="product">
                    </div>
                    
                    <div class="cart-item-information">
                        <p class="cart-item-name">${product.title}</p>
                        <p class="cart-item-price" data-id=${product.id}><span>${product.price}</span> $</p>
                    </div>
                    
                    <div class="cart-item-conteoller">
                        <i class="fas fa-chevron-up" data-id=${product.id}></i>
                        <p data-id=${product.id}>${count}</p>
                        <i class="fas fa-chevron-down" data-id=${product.id}></i>
                    </div>
                    
                    <div class="cart-item-clear">
                        <i class="fas fa-trash" data-id=${product.id}></i>
                    </div>
                </div>
            `;

        // add item to cart
        cartContent.innerHTML += add;
      });
    } else if (cart == null) {
      // get all buttons add to cart
      let addToCartBtns = document.querySelectorAll(".addToCart");
      // convert nodelist to array
      let newAddToCartBtns = [...addToCartBtns];

      // do loop on newAddToCartBtns
      newAddToCartBtns.map((btn) => {
        // icon tag
        let i = `<i class="fas fa-shopping-cart"></i>`;
        // replace button text to add to cart
        btn.innerHTML = i + "add to cart";

        btn.disabled = false;
      });
    }
  }

  conteoller() {

    // access to the all plus one tag
    let plusOneNode = document.querySelectorAll(".fa-chevron-up");
    // convert to array type of node type
    let plusOne = [...plusOneNode];


    // loop on plusOne for add event listener on all btn plus on
    plusOne.map((btn) => {
      btn.addEventListener("click", (e) => {

        // access to the counter product in cart
        let counter = Number(btn.parentElement.children[1].innerText);

        // plus one product in cart
        let newCounter = (btn.parentElement.children[1].innerText =
          counter + 1);

        // loop on countitems for remove item Repetitious
        countitems.forEach((item, index) => {
          if (item.id == e.target.dataset.id) {
            countitems.splice(index, 1);
          }
        });

        // build new item 
        let item = {
          id: e.target.dataset.id,
          count: newCounter,
        };

        // add new item to countitems
        countitems.push(item);

        // add countitems to localStorage
        localStorage.setItem("countItems", JSON.stringify(countitems));

        // update total price
        this.updateTotalPrice();
      });
    });

    // access to the counter product in cart
    let subtractNode = document.querySelectorAll(".fa-chevron-down");

    // subtract product in cart
    let subtract = [...subtractNode];


    // loop on subtract tags
    subtract.map((btn) => {

      // add lister on every btns subtract
      btn.addEventListener("click", (e) => {

        // access to the counter product in cart
        let counter = Number(btn.parentElement.children[1].innerText);

        // plus one product in cart
        if (counter > 1) {
          let newCounter = (btn.parentElement.children[1].innerText =
            counter - 1);

          // get proucts of localStorage
          let cartData = JSON.parse(localStorage.getItem("products"));
          cartData.map((product) => {
            if (product.id == e.target.dataset.id) {
            }
          });

          // loop on countitems for remove item Repetitious
          countitems.forEach((item, index) => {
            if (item.id == e.target.dataset.id) {
              countitems.splice(index, 1);
            }
          });

          // build new item 
          let item = {
            id: e.target.dataset.id,
            count: newCounter,
          };

          // add new item to countitems
          countitems.push(item);

          // add countitems to localStorage
          localStorage.setItem("countItems", JSON.stringify(countitems));
        }

        if (counter <= 1) {

          // access to the cart container
          let cartContentArr = [...cartContent.children];

          // loop on all item in cart
          cartContentArr.forEach((product, index) => {

            // if event target id == product id in localStorage
            if (e.target.dataset.id == product.dataset.id) {

              // remove this product 
              cartContentArr.splice(index, 1);


              let cartData = JSON.parse(localStorage.getItem("cart"));

              // loop on cart data
              cartData.forEach((productdata, index) => {

                if (product.dataset.id == productdata.id) {
                  cartData.splice(index, 1);
                }
              });

              localStorage.setItem("cart", JSON.stringify(cartData));
              let newCart = JSON.parse(localStorage.getItem("cart"));

              // cartContent = ""
              cartContent.innerHTML = "";

              // do loop on newCart
              newCart.map((product) => {
                // build item for append to newCart
                let add = `
                          <div class="cart" data-id=${product.id}>
                              
                              <div class="cart-item-img">
                                  <img src=${product.imageUrl} alt="product">
                              </div>
                              
                              <div class="cart-item-information">
                                  <p class="cart-item-name">${product.title}</p>
                                  <p class="cart-item-price" data-id=${product.id}><span>${product.price}</span> $</p>
                              </div>
                              
                              <div class="cart-item-conteoller">
                                  <i class="fas fa-chevron-up" data-id=${product.id}></i>
                                  <p data-id=${product.id}>1</p>
                                  <i class="fas fa-chevron-down" data-id=${product.id}></i>
                              </div>
                              
                              <div class="cart-item-clear">
                                  <i class="fas fa-trash" data-id=${product.id}></i>
                              </div>
                          </div>
                      `;

                // add item to cart
                cartContent.innerHTML += add;
                this.conteoller();
              });

              // access to the cart conitainer
              let newCartConent = [...cartContent.children];
              // if cart container is null
              if (newCartConent.length == 0) {
                totalPrice.innerText = 0;
              }

              let result;
              // if cart isn't null
              if (cart) {
                // find event target id to cart modal
                result = cart.find((p) => p.id == event.target.dataset.id);
              }

              // if result isn't null
              if (result) {
                // get all buttons add to cart
                let addToCartBtns = document.querySelectorAll(".addToCart");
                // convert nodelist to array
                let newAddToCartBtns = [...addToCartBtns];

                // do loop on newAddToCartBtns
                newAddToCartBtns.map((btn) => {
                  // btn data-id == event target id
                  if (btn.dataset.id == event.target.dataset.id) {
                    // build i
                    let i = `<i class="fas fa-shopping-cart"></i>`;
                    // replace btn text
                    btn.innerHTML = i + "add to cart";

                    btn.disabled = false;
                  }
                });
              }
            }
          });

          // loop on countitems for remove Repetitious product
          countitems.forEach((item, index) => {
            if (item.id == e.target.dataset.id) {
              countitems.splice(index, 1);
            }
          });

          // add new countitems to localStorage
          localStorage.setItem("countItems", JSON.stringify(countitems));
        }

        this.updateTotalPrice();
      });
    });

    // access to the all btns remove item of cart
    let removeItemNode = document.querySelectorAll(".fa-trash");

    // convert to array type of node type
    let removeItem = [...removeItemNode];

    // loop on removeItem 
    removeItem.map((btn) => {

      // add listener on every btns
      btn.addEventListener("click", (e) => {

        // access to the cart contanier
        let cartContentArr = [...cartContent.children];

        // loop on cart countainer
        cartContentArr.forEach((product, index) => {

          // if event target id == product id , remove this product in cart
          if (e.target.dataset.id == product.dataset.id) {
            cartContentArr.splice(index, 1);

            let cartData = JSON.parse(localStorage.getItem("cart"));

            cartData.forEach((productdata, index) => {
              if (product.dataset.id == productdata.id) {
                cartData.splice(index, 1);
              }
            });
            localStorage.setItem("cart", JSON.stringify(cartData));
            let newCart = JSON.parse(localStorage.getItem("cart"));
            // cartContent = ""
            cartContent.innerHTML = "";

            // do loop on newCart
            newCart.map((product) => {
              // build item for append to newCart
              let add = `
                          <div class="cart" data-id=${product.id}>
                              
                              <div class="cart-item-img">
                                  <img src=${product.imageUrl} alt="product">
                              </div>
                              
                              <div class="cart-item-information">
                                  <p class="cart-item-name">${product.title}</p>
                                  <p class="cart-item-price" data-id=${product.id}><span>${product.price}</span> $</p>
                              </div>
                              
                              <div class="cart-item-conteoller">
                                  <i class="fas fa-chevron-up" data-id=${product.id}></i>
                                  <p data-id=${product.id}>1</p>
                                  <i class="fas fa-chevron-down" data-id=${product.id}></i>
                              </div>
                              
                              <div class="cart-item-clear">
                                  <i class="fas fa-trash" data-id=${product.id}></i>
                              </div>
                          </div>
                      `;

              // add item to cart
              cartContent.innerHTML += add;
              this.conteoller();
            });

            let newCartConent = [...cartContent.children];
            if (newCartConent.length == 0) {
              localStorage.setItem("countItems", JSON.stringify([]));
              totalPrice.innerText = 0;
            }

            let result;
            // if cart isn't null
            if (cart) {
              // find event target id to cart modal
              result = cart.find((p) => p.id == event.target.dataset.id);
            }

            // if result isn't null
            if (result) {
              // get all buttons add to cart
              let addToCartBtns = document.querySelectorAll(".addToCart");
              // convert nodelist to array
              let newAddToCartBtns = [...addToCartBtns];

              // do loop on newAddToCartBtns
              newAddToCartBtns.map((btn) => {
                // btn data-id == e target id
                if (btn.dataset.id == e.target.dataset.id) {
                  // build i
                  let i = `<i class="fas fa-shopping-cart"></i>`;
                  // replace btn text
                  btn.innerHTML = i + "add to cart";

                  btn.disabled = false;
                }
                this.updateTotalPrice();
              });
            }
          }
        });

        countitems.forEach((item, index) => {
          if (item.id == e.target.dataset.id) {
            countitems.splice(index, 1);
          }
        });

        localStorage.setItem("countItems", JSON.stringify(countitems));

        this.updateTotalPrice();
      });
    });
  }


  updateTotalPrice() {
    if (cart) {
      let allPriceitems = [];

      let priceitemsNode = document.querySelectorAll(".cart-item-price");
      let countItemsNode = document.querySelectorAll(".cart-item-conteoller p");

      let countItemsHtml = [...countItemsNode];
      let priceitems = [...priceitemsNode];

      //

      priceitems.forEach((item) => {
        countitems.forEach((cItem) => {
          if (item.dataset.id == cItem.id) {
            let newTotalPrice =
              Number(item.firstElementChild.innerText) * Number(cItem.count);
            allPriceitems.push(newTotalPrice);
          }
        });
        //
        countItemsHtml.forEach((itemHtml) => {
          if (Number(itemHtml.innerText) < 1) {
            let newTotalPrice =
              Number(item.firstElementChild.innerText) *
              Number(itemHtml.innerText);
            allPriceitems.push(newTotalPrice);
          }
        });

        let allNewtotalPrice = allPriceitems.reduce((acc, cur) => {
          return acc + cur;
        });

        totalPrice.innerText = allNewtotalPrice.toFixed(2);
      });

      let countProductInCart = 0;
      // let  = JSON.parse(localStorage.getItem("countItems"));

      countitems.forEach((count) => {
        countProductInCart += count.count;
      });

      cartItem.innerText = countProductInCart;
    }

    if (!cart) {
      localStorage.setItem("countItems", JSON.stringify([]));
    }
  }
}

// class save products to local storage
class SaveToLocalStorage {
  // save all product to local storage
  static saveToLS(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// listeners //

// build chhild of Ui class
let ui = new Ui();

// listener when load page
document.addEventListener("DOMContentLoaded", () => {
  // build child of GetProducts class
  let products = new GetProducts();
  // call getproducts method
  let productsData = products.getProducts();

  // call addToUi
  ui.addToUi(productsData);

  // call getAddToCartBtns for add data to ui
  ui.getAddToCartBtns();

  // call convertBtnToInCart for convert button text to In cart when clicked
  ui.convertBtnToInCart();

  // call addProductToCart for add product to cart when clicked on buy product
  ui.addProductToCart();

  ui.conteoller();

  ui.updateTotalPrice();

  // call saveToLs of SaveToLocalStorage class
  SaveToLocalStorage.saveToLS(productsData);
});

// listener cart button when clicked
cartBtn.addEventListener("click", showCartFn);

// listener backdrop when clicked
backdrop.addEventListener("click", hideCartFn);

// listener confirm in cart modal when clicked
confirmCart.addEventListener("click", hideCartFn);

// listener clear cart id cart when clicked
clearCart.addEventListener("click", clearCartFn);

// funcitons //
function showCartFn() {
  cartModal.style.transform = "translateY(80%)";
  backdrop.style.display = "block";
}

function hideCartFn() {
  cartModal.style.transform = "translateY(-150%)";
  backdrop.style.display = "none";
}

function clearCartFn() {

  // convert cartContent to ""
  cartContent.innerHTML = "";

  // remove cartdata of local storage
  localStorage.removeItem("cart");
  // call addProductToCart for convert to add to cart when clear cart
  ui.addProductToCart();

  ui.updateTotalPrice();

  totalPrice.innerText = 0;

  cartItem.innerText = 0;

  cartModal.style.transform = "translateY(-150%)";
  backdrop.style.display = "none";
}
