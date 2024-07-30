import { cart } from "../../data/cart-class.js"
import { getProduct, products } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js"
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
// import renderCheckoutHeader from "./checkoutHeader.js"

export function renderOrderSummary() {

    let cartSummaryHTML = ""
    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId
        const matchingProduct = getProduct(productId)
        let deliveryOptionId = cartItem.deliveryOptionId
        const deliveryOption = getDeliveryOption(deliveryOptionId)
        const today = dayjs()
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            "days"
        )
        const dateString = deliveryDate.format(
            "dddd, MMMM D"
        )
        cartSummaryHTML +=
            `
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}">
                          <div class="delivery-date">
                               ${dateString}
                          </div>

                      <div class="cart-item-details-grid">
                          <img class="product-image" src="${matchingProduct.image}">

                          <div class="cart-item-details">
                              <div class="
                              js-product-name-${matchingProduct.id}
                              product-name
                              ">
                                  ${matchingProduct.name}
                              </div>
                              <div class="
                              js-product-price-${matchingProduct.id}
                              product-price
                              ">
                                  ${matchingProduct.getPrice()}
                              </div>
                              <div class="product-quantity
                              js-product-quantity-${matchingProduct.id}
                              ">
                                  <span>
                                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                                  </span>
                                  <span data-product-id=${matchingProduct.id} class=" js-update-button-${matchingProduct.id} js-update-button update-quantity-link link-primary">
                                 Update
                                 </span>
                                 <input type="number" class=" quantity-input quantity-input-${matchingProduct.id}" ></input>
                                  <span class=" save-quantity-link save-quantity-link-${matchingProduct.id} link-primary" >
                                  Save
                                        </span>              
                                    <span 
                                    data-product-id=${matchingProduct.id}
                                     class=" js-delete-link-${matchingProduct.id} js-delete-link delete-quantity-link link-primary">
                                    Delete
                                    </span>
                              </div>
                          </div>

                          <div class="delivery-options">
                              <div class="delivery-options-title">
                                  Choose a delivery option:
                              </div>
                              ${deliveryOptionHTML(matchingProduct, cartItem)}
                          </div>
                      </div>
                  </div>
    `
    })

    function deliveryOptionHTML(matchingProduct, cartItem) {
        let html = ""

        deliveryOptions.forEach((deliveryOption) => {
            let someDay = dayjs()
                // let deliveryDays = today.add(
                //     deliveryOption.deliveryDays,
                //     "days"

            // )

            let deliveryDays = deliveryOption.deliveryDays
            while (deliveryDays > 0) {

                if (someDay.format("dddd") === "Saturday" || someDay.format("dddd") === "Sunday") {
                    someDay = someDay.add(1, "days")
                    continue
                } else {
                    someDay = someDay.add(1, "days")
                }
                deliveryDays -= 1
            }
            const dateString = someDay.format(
                "dddd, MMMM D"
            )
            const priceString = deliveryOption.priceCents === 0 ?
                "FREE" :
                `$${formatCurrency(deliveryOption.priceCents)} - `
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId

            html += `
     <div class="delivery-option">
        <input
        ${isChecked ? 'checked' : ''} 
        type="radio" class=" 
        js-delivery-option-productId-${cartItem.productId}
        js-delivery-option-deliveryOptionId-${deliveryOption.id}
        js-delivery-option delivery-option-input
        " 
        name="delivery-option-${matchingProduct.id}"
        data-product-id=${matchingProduct.id}
        data-delivery-option-id=${deliveryOption.id}
        
        >
        <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
        </div>
     </div>
    `
        })
        return html
    }
    document.querySelector(".js-order-summary")
        .innerHTML = cartSummaryHTML
    let cartQuantity = cart.calculateCartQuantity()

    document.querySelectorAll(".js-delete-link").
    forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId
            cart.removeFromCart(productId)
            cartQuantity = cart.calculateCartQuantity()
                // renderCheckoutHeader()
            renderPaymentSummary()
            renderOrderSummary()
        })
    })

    function responseForUpdateButton(productId) {
        document.querySelector(`.quantity-label-${productId}`).classList.add("invisible")
        document.querySelector(`.js-update-button-${productId}`).classList.add("invisible")
        document.querySelector(`.quantity-input-${productId}`).classList.add("visible")
        document.querySelector(`.save-quantity-link-${productId}`).classList.add("visible")
    }

    function responseForSave(productId, itemQuantity) {
        if (itemQuantity.value >= 0 && itemQuantity.value < 1000) {
            const quantity = Number(itemQuantity.value)
            document.querySelector(`.quantity-label-${productId}`).classList.remove("invisible")
            document.querySelector(`.js-update-button-${productId}`).classList.remove("invisible")
            document.querySelector(`.quantity-input-${productId}`).classList.remove("visible")
            document.querySelector(`.save-quantity-link-${productId}`).classList.remove("visible")
            document.querySelector(`.quantity-label-${productId}`).innerHTML = quantity
            cart.updateQuantity(productId, quantity)
            cartQuantity = cart.calculateCartQuantity()


        } else {
            alert("Invalid quantity")
        }
    }
    document.querySelectorAll(".js-update-button")
        .forEach((updateButton) => {
            updateButton.addEventListener("click", () => {
                const productId = updateButton.dataset.productId
                responseForUpdateButton(productId)
                const itemQuantity = document.querySelector(`.quantity-input-${productId}`)


                document.querySelector(`.save-quantity-link-${productId}`).addEventListener("click", () => {
                    responseForSave(productId, itemQuantity)
                    renderPaymentSummary()
                    renderOrderSummary()
                        // renderCheckoutHeader()
                })
                itemQuantity.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        responseForSave(productId, itemQuantity)
                        renderPaymentSummary()
                            // renderCheckoutHeader()
                        renderOrderSummary()
                    }
                })

            })
        })
    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset

            cart.updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })

}