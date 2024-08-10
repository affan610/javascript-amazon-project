import { updateHeaderCartQuantity } from "./utils/headerCartQuantity.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const url = new URL(window.location.href);
const productId = url.searchParams.get("productId");

const orderId = url.searchParams.get("orderId");
updateHeaderCartQuantity();

async function loadPage() {
  await loadProductsFetch();
  const matchingProduct = getProduct(productId);
  let matchingOrderProduct;
  orders.forEach((order) => {
    if (order.id === orderId) {
      order.products.forEach((product) => {
        if ((product.productId = productId)) {
          matchingOrderProduct = product;
        }
      });
    }
  });
  let deliveryTime = dayjs(matchingOrderProduct.estimatedDeliveryTime).format(
    "dddd MMMM D"
  );

  let trackingHtml = ` 
         <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${deliveryTime}</div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">Quantity: ${matchingOrderProduct.quantity}</div>

        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        `;
  document.querySelector(".js-order-tracking").innerHTML = trackingHtml;
}
loadPage();
