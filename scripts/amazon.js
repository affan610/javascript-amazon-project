import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";
import { updateHeaderCartQuantity } from "./utils/headerCartQuantity.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
loadProducts(renderProductsGrid)
function renderProductsGrid(){
let productsHTML = "";
products.forEach((product) => {
    productsHTML += `
        <div data-product-id=${product.id}  class=" js-product-container product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div>
            <select class="js-item-quantity"
             data-product-id=${product.id}
             >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHTML()}
          <div class="product-spacer"></div>

          <div class=" js-added-to-cart-${product.id} added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
           data-product-id="${product.id}">
            Add to Cart
          </button>
        </div> 
  `;
});
let cartQuantity = cart.calculateCartQuantity();
updateHeaderCartQuantity()
document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      let itemQuantity;
      document.querySelectorAll(".js-item-quantity").forEach((selectButton)=>{ 
        if(selectButton.dataset.productId === productId){
          itemQuantity = selectButton.value
        }
      })
      let matchingCartItem;

      cart.cartItems.forEach((cartItem)=>{
        if(cartItem.productId === productId){
          matchingCartItem =cartItem
        }
        if(matchingCartItem){
           cart.updateQuantity(productId, itemQuantity)
           updateHeaderCartQuantity()
          } else{
          cart.addToCart(productId)
          updateHeaderCartQuantity()
        }
      })
      //  const adddMessage =  document.querySelector(`.js-added-to-cart-${productId}`)
      //  adddMessage
      //  .classList.add("added-to-cart-visible")
      //  setTimeout(() => {
      //   adddMessage
      //  .classList.re("added-to-cart-visible")
      //  }, 2000);
      });
});
}