import { cart } from "../../data/cart-class.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct, products, loadProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { formatCurrency } from "../../scripts/utils/money.js";
describe('test suite: renderOrderSummary', () => {
    let productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    let productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"


    beforeAll((done) => {
        loadProducts(() => {
            done()
        })
    })

    let productName1;
    let productName2;
    let productPrice1;
    let productPrice2

    beforeEach(() => {

            productName1 = getProduct(productId1).name
            productName2 = getProduct(productId2).name
            productPrice1 = formatCurrency(getProduct(productId1).priceCents)
            productPrice2 = formatCurrency(getProduct(productId2).priceCents)
            spyOn(localStorage, "setItem")
            document.querySelector(".js-test-container")
                .innerHTML = `
  <div class='js-order-summary' ></div>  
  <div class ='payment-summary' ></div>
  `

            cart.cartItems = [{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: "1",
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: "2"
            }]

            document.querySelector(".js-order-summary")
                .innerHTML = "hi"

            renderOrderSummary()

        })
        // becasue it runs it statements in different orders it will cause u porblem while running the remove cart it statement there at first comment out this it statement it will solve the problem
    it("displays the cart", () => {

        expect(productName1).toEqual(document.querySelector(`.js-product-name-${productId1}`).innerText)
        expect(productName2).toEqual(document.querySelector(`.js-product-name-${productId2}`).innerText)


        expect(
            `$${productPrice1}`
        ).toEqual(document.querySelector(`.js-product-price-${productId1}`).innerText)

        expect(
            `$${productPrice2}`
        ).toEqual(document.querySelector(`.js-product-price-${productId2}`).innerText)


        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(2)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain("Quantity: 2")
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain("Quantity: 1")
    })
    it("removes a product", () => {

        expect(
            `$${productPrice2}`
        ).toEqual(document.querySelector(`.js-product-price-${productId2}`).innerText)

        expect(productName2).toEqual(document.querySelector(`.js-product-name-${productId2}`).innerText)

        document.querySelector(`.js-delete-link-${productId1}`).click()

        expect(
            cart.cartItems.length
        ).toEqual(1)
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(1)
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null)
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null)
        expect(
            cart.cartItems.length
        ).toEqual(1)
        expect(
            cart.cartItems[0].productId
        ).toEqual(productId2)

    })
    afterEach(() => {
        document.querySelector(".js-test-container")
            .innerHTML = ` `
    })
});
describe("test suite: updates the delivery option", () => {
    beforeAll((done) => {
        loadProducts(() => {
            done()
        })
    })
    let productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    let productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    beforeEach(() => {
        document.querySelector(".js-test-container")
            .innerHTML = `
        <div class="js-order-summary"></div>
        <div class="payment-summary" ></div>
        `

        cart.cartItems = [{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: "1",
        }, {
            productId: productId2,
            quantity: 2,
            deliveryOptionId: "2"
        }]
        renderOrderSummary()
    })
    it("makes the input checked", () => {

        let theDeliveryOption;
        document.querySelectorAll(`.js-delivery-option-productId-${productId1}`).forEach((deliveryOption) => {
            if (deliveryOption.classList.contains(`js-delivery-option-deliveryOptionId-3`)) {
                theDeliveryOption = deliveryOption
            }
        })
        theDeliveryOption.click()
        expect(theDeliveryOption.checked).toEqual(true)
        expect(cart.cartItems.length).toEqual(2)
        expect(cart.cartItems[0].productId).toEqual(productId1)
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")
        expect(document.querySelector(".js-payment-summary-shippingCost").innerText).toEqual("$14.98")
        expect(document.querySelector(".js-payment-summary-totalCost").innerText).toEqual("$63.50")
    })
    afterEach(() => {
        document.querySelector(".js-test-container")
            .innerHTML = ` `
    })
})