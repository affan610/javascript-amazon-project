export const orders = []
export function addOrder(order){
  orders.unshift(order)
  saveToStorage()
}
function saveToStorage(){
  localStorage.setItem("orders", JSON.stringify(orders))
}