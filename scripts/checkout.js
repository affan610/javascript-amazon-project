import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js"
// import "../data/car.js"

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve("value 1")
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve()
        })
    })
]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})


// new Promise((resolve) => {
//         console.log("promise started")
//         loadProducts(() => {
//             resolve("value 1")
//         })
//     }).then((value) => {
//         console.log(value)
//         return new Promise((resolve) => {
//             loadCart(() => {
//                 resolve()
//             })
//         })
//     }).then(() => {
//         console.log("the last step")
//     })
// loadProducts(() => {
//     loadCart(() => {

//         renderOrderSummary();
//         renderPaymentSummary();
//         renderCheckoutHeader();
//     })
// })