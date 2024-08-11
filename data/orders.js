import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "./cart-class.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "./deliveryOptions.js";
import { loadCartFetch } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  order.products.forEach((product) => {
    const productId = product.productId
    let matchingCartItem;
    cart.cartItems.forEach((cartItem)=>{
      if(cartItem.productId = productId){
        matchingCartItem = cartItem
      }
    })
    const deliveryOption = getDeliveryOption(matchingCartItem.deliveryOptionId)
    const deliveryDate = calculateDeliveryDate(deliveryOption)
    product.estimatedDeliveryTime = deliveryDate;

  });
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function getOrder(orderId){
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id === orderId){
      matchingOrder = order
    }
    
  })
  return matchingOrder;
}