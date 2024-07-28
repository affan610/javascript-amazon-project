import { cart, loadFromStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { formatCurrency } from "../../scripts/utils/money.js";
// describe('test suite: renderOrderSummary', () => {
//     let productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
//     let productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
//     const productName1 = getProduct(productId1).name
//     const productName2 = getProduct(productId2).name
//     const productPrice1 = formatCurrency(getProduct(productId1).priceCents)
//     const productPrice2 = formatCurrency(getProduct(productId2).priceCents)
//     beforeEach(() => {
//             spyOn(localStorage, "setItem")
//             document.querySelector(".js-test-container")
//                 .innerHTML = `
//   <div class='js-order-summary' ></div>  
//   <div class ='payment-summary' ></div>
//   `
//             spyOn(localStorage, "getItem").and.callFake(() => {
//                 return JSON.stringify([{
//                     productId: productId1,
//                     quantity: 2,
//                     deliveryOptionId: "1",
//                 }, {
//                     productId: productId2,
//                     quantity: 1,
//                     deliveryOptionId: "2"
//                 }])
//             })
//             loadFromStorage()
//             renderOrderSummary()
//         })
//         // becasue it runs it statements in different orders it will cause u porblem while running the remove cart it statement there at first comment out this it statement it will solve the problem
//     it("displays the cart", () => {

//         expect(productName1).toEqual(document.querySelector(`.js-product-name-${productId1}`).innerText)
//         expect(productName2).toEqual(document.querySelector(`.js-product-name-${productId2}`).innerText)


//         expect(
//             productPrice1
//         ).toEqual(document.querySelector(`.js-product-price-${productId1}`).innerText)

//         expect(
//             productPrice2
//         ).toEqual(document.querySelector(`.js-product-price-${productId2}`).innerText)


//         expect(
//             document.querySelectorAll(".js-cart-item-container").length
//         ).toEqual(2)
//         expect(
//             document.querySelector(`.js-product-quantity-${productId1}`).innerText
//         ).toContain("Quantity: 2")
//         expect(
//             document.querySelector(`.js-product-quantity-${productId2}`).innerText
//         ).toContain("Quantity: 1")
//     })
//     it("removes a product", () => {

//         expect(
//             productPrice2
//         ).toEqual(document.querySelector(`.js-product-price-${productId2}`).innerText)

//         expect(productName2).toEqual(document.querySelector(`.js-product-name-${productId2}`).innerText)

//         document.querySelector(`.js-delete-link-${productId1}`).click()

//         expect(
//             cart.length
//         ).toEqual(1)
//         expect(
//             document.querySelectorAll(".js-cart-item-container").length
//         ).toEqual(1)
//         expect(
//             document.querySelector(`.js-cart-item-container-${productId1}`)
//         ).toEqual(null)
//         expect(
//             document.querySelector(`.js-cart-item-container-${productId2}`)
//         ).not.toEqual(null)
//         expect(
//             cart.length
//         ).toEqual(1)
//         expect(
//             cart[0].productId
//         ).toEqual(productId2)

//     })
//     afterEach(() => {
//         document.querySelector(".js-test-container")
//             .innerHTML = ` `
//     })
// });
// describe("test suite: updates the delivery option", () => {
//     let productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
//     let productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
//     beforeEach(() => {
//         document.querySelector(".js-test-container")
//             .innerHTML = `
//         <div class="js-order-summary"></div>
//         <div class="payment-summary" ></div>
//         `

//         spyOn(localStorage, "getItem").and.callFake(() => {
//             return JSON.stringify([{
//                 productId: productId1,
//                 quantity: 1,
//                 deliveryOptionId: "1",
//             }, {
//                 productId: productId2,
//                 quantity: 2,
//                 deliveryOptionId: "2"
//             }])
//         })
//         loadFromStorage()
//     })
//     it("makes the input checked", () => {
//         renderOrderSummary()
//         let theDeliveryOption;
//         document.querySelectorAll(`.js-delivery-option-productId-${productId1}`).forEach((deliveryOption) => {
//             if (deliveryOption.classList.contains(`js-delivery-option-deliveryOptionId-3`)) {
//                 theDeliveryOption = deliveryOption
//             }
//         })
//         theDeliveryOption.click()
//         expect(theDeliveryOption.checked).toEqual(true)
//         expect(cart.length).toEqual(2)
//         expect(cart[0].productId).toEqual(productId1)
//         expect(cart[0].deliveryOptionId).toEqual("3")
//         expect(document.querySelector(".js-payment-summary-shippingCost").innerText).toEqual("$14.98")
//         expect(document.querySelector(".js-payment-summary-totalCost").innerText).toEqual("$63.50")
//     })
// })