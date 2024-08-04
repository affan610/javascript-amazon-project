import { cart } from "../../data/cart-class.js"
export function updateHeaderCartQuantity(){
document.querySelector(".js-cart-quantity")
.innerHTML = cart.calculateCartQuantity()
}