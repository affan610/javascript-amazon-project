export default function searchProducts() {
  const search = document.querySelector(".js-search-bar").value;
  console.log(search.toLowerCase())
  window.location.href = `amazon.html?search=${search}`;
}
