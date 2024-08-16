import { updateHeaderCartQuantity } from "./utils/headerCartQuantity.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder, orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadPage() {
  updateHeaderCartQuantity();
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");

  const orderId = url.searchParams.get("orderId");
  const product = getProduct(productId);
  const order = getOrder(orderId);
  let matchingOrderProduct;

  console.log(orders);
  order.products.forEach((product) => {
    if ((product.productId = productId)) {
      matchingOrderProduct = product;
    }
  });
  let deliveryTime = dayjs(matchingOrderProduct.estimatedDeliveryTime).format(
    "dddd MMMM D"
  );
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTimeOrder = dayjs(matchingOrderProduct.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTimeOrder - orderTime)) * 100;
  console.log(percentProgress);
  let trackingHtml = ` 
         <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${deliveryTime}</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${
          matchingOrderProduct.quantity
        }</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label
          ${percentProgress < 50 ? "current-status" : ""}
          ">Preparing</div>
          <div class="progress-label 
          ${percentProgress >= 50 ? "current-status" : ""}
          ">Shipped</div>
          <div class="progress-label
          ${percentProgress >= (100 ? "current-status" : "")}
          ">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div style="width:${percentProgress}%;" class="progress-bar"></div>
        </div>
        `;
  document.querySelector(".js-order-tracking").innerHTML = trackingHtml;
}
loadPage();
document.querySelector(".search-button").addEventListener("click", () => {
  let keyword = document.querySelector(".search-bar").value;
  window.location.href = `amazon.html?search=${keyword}`;
});
