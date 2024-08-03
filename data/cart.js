export let cart;
loadFromStorage()

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        cart = [{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1",
        }, {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "2"
        }]
    }
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
}
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    })
    if (matchingItem) {
        matchingItem.quantity++
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: "1"
        })

    }
    saveToStorage()
}

export function removeFromCart(productId) {
    const newCart = []
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })
    cart = newCart
    saveToStorage()
}
export function calculateCartQuantity() {
    let cartQuantity = 0
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    return cartQuantity


}
export function updateQuantity(productId, newQuantity) {
    let matchingProduct;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem
        }
    })
    matchingProduct.quantity = newQuantity
    saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionid) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    })

    if (!matchingItem) {
        return
    } else if (deliveryOptionid < 1 || deliveryOptionid > 3) {
        return
    }
    matchingItem.deliveryOptionId = deliveryOptionid
    saveToStorage()
}
export function loadCart(func) {


    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {

        setTimeout(() => {
            console.log(xhr.response)
            func()
        }, 1000);
    })
    xhr.open("GET", "https://supersimplebackend.dev/cart")
    xhr.send()

}
export async function loadCartFetch() {
    const response = await fetch("https://supersimplebackend.dev/cart")
    const text  = await response.text()
    console.log(text)
}