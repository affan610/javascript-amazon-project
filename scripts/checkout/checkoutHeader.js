import { cart } from "../../data/cart-class.js";

export default function renderCheckoutHeader() {
  document.querySelector(".js-return-to-home-link").innerHTML =
    cart.calculateCartQuantity() + " items";
}
