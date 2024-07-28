import { calculateCartQuantity } from "../../data/cart.js";

export default function renderCheckoutHeader() {
    document.querySelector(".js-return-to-home-link").innerHTML = calculateCartQuantity()
}