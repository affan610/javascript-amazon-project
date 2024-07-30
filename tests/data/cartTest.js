import { cart } from "../../data/cart-class.js"
describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem")
    })
    it("adds a new product to the cart", () => {

        cart.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1"
        }]
        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems[0].quantity).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledWith("cart-oop", JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1"
        }]))
    })
    it("adds an existing product to the cart", () => {

        cart.cartItems = []

        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems[0].quantity).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cart-oop", JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1"
        }]))
    })

});
describe("test suite: removeFromCart", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem")
        cart.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
        }]
    })

    it('removes a product form the cart', () => {


        cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

        expect(cart.cartItems.length).toEqual(0)
        expect(cart.cartItems).toEqual([])
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-oop",
            JSON.stringify([])
        )

    });
    it("does nothing if there is nothing int he cart", () => {

        cart.removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(cart.cartItems.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-oop",
            JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
            }])
        )
    })
})
describe('updates the delivery option', () => {
    let productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    let productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    beforeEach(() => {
        spyOn(localStorage, "setItem")
        cart.cartItems = [{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1",
        }, {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "2"
        }]
    })
    it("updates the delivery option", () => {
        cart.updateDeliveryOption(productId1, "3")
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")
        expect(cart.cartItems.length).toEqual(2)
        expect(cart.cartItems[0].quantity).toEqual(1)
        expect(cart.cartItems[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-oop",
            JSON.stringify(
                [{
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "3",
                }, {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "2"
                }]
            )
        )
    })
    it("changes nothing if item is not in the cart", () => {
        cart.updateDeliveryOption("not a item", "3")
        expect(cart.cartItems.length).toEqual(2)
        expect(cart.cartItems[0].quantity).toEqual(1)
        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(cart.cartItems[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })
    it("does nothing if the deliveryoptionId is invalid", () => {
        cart.updateDeliveryOption(productId1, "5")
        expect(cart.cartItems.length).toEqual(2)
        expect(cart.cartItems[0].quantity).toEqual(1)
        expect(cart.cartItems[0].productId).toEqual(productId1)
        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })
});