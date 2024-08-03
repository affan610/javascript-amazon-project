import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import "../data/cart-class.js"
// import "../data/car.js"


async function loadPage() {
    try {
    // throw "error1"
    await Promise.all([

     loadProductsFetch(),
     loadCartFetch()
    ])
    } catch (error){
         console.log("Unexpected error. Please Try again Later")
    }
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

}
loadPage()
    /*
    Promise.all([
        loadProductsFetch(),
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

    */
    /*
    new Promise((resolve) => {
        console.log("promise started")
        loadProducts(() => {
            resolve("value 1")
        })
    }).then((value) => {
    console.log(value)
        return new Promise((resolve) => {
            loadCart(() => {
                resolve()
            })
        })
    }).then(() => {

        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
        */