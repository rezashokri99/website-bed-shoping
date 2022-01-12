// access //

// access to the data 
import products from "./products.js";
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

let addToCartBtn = document.querySelectorAll(".product");








// classes //

// class get products data
class GetProducts{
    getProducts() {
        return productsData
    }
}


// class append products data to ui
class Ui{
    addToUi(products){
        products.forEach((product) => {
            let buildProduct = `
            <div class="product">
                
                <img src=${product.imageUrl} alt="product">
                
                <div class="information">
                    <span class="nameProduct">${product.title}</span>
                    <span class="price">${product.price} $</span>
                </div>
                
                <a href="#" class="addToCart" data-id=${product.id}><i class="fas fa-shopping-cart"></i>add to cart</a>
            </div>
            `
            productContainer.innerHTML += buildProduct;
        })
    }
}


// class save products to local storage
class SaveToLocalStorage{
    static saveToLS(products){
        localStorage.setItem("products", JSON.stringify(products))
    }
}







// listeners //

document.addEventListener("DOMContentLoaded", () => {
    let products = new GetProducts();
    let productsData = products.getProducts();
    
    let ui = new Ui();
    let add = ui.addToUi(productsData)
    
    SaveToLocalStorage.saveToLS(productsData);
})

// listener cart button when clicked
cartBtn.addEventListener("click", showCartFn);

// listener backdrop when clicked
backdrop.addEventListener("click", hideCartFn);

// listener confirm in cart modal when clicked
confirmCart.addEventListener("click", hideCartFn);;

// listener button add to cart when clicked
// addToCartBtn.addEventListener("click", addToCartFn);




// funcitons //
function showCartFn() {
    cartModal.style.transform = "translateY(80%)";
    backdrop.style.display = "block";
    console.log(addToCartBtn);
}

function hideCartFn() {
    cartModal.style.transform = "translateY(-150%)";
    backdrop.style.display = "none";
}

function addToCartFn(e) {
    console.log(e.terget);
}