let cart = [];
let total = 0;

function addToCart(itemId, price) {
    cart.push({itemId, price});
    total += price;
    updateCartDisplay();
    updateCartCount();
}
function updateCartDisplay() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartCount() {
    const CART_COUNT = document.querySelector(".total-items");
    CART_COUNT.textContent = cart.length;
}

const ADD_TO_CART_BTN = document.querySelectorAll(".buy");
ADD_TO_CART_BTN.forEach((btn) => {
    btn.addEventListener("click", event => {
        const ITEM_DIV = event.target.closest(".item");
        const ITEM_ID = ITEM_DIV.getAttribute("item-id");
        const PRICE = parseFloat(ITEM_DIV.getAttribute("item-price"));
        addToCart(ITEM_ID, PRICE);
    });
});