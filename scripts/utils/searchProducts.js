export default function searchProducts() {
  const search = document.querySelector(".js-search-bar").value;
  window.location.href = `amazon.html?search=${search}`;
}
