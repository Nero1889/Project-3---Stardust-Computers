/* Cart Item and Total Count */
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

window.addEventListener("load", () => {
    const STORED_CART = localStorage.getItem("cart");
    if (STORED_CART) {
        cart = JSON.parse(STORED_CART);
        cart.forEach((item) => {
            total += item.price;
        });
        updateCartCount();
    }
});

let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
    const CART_ITEMS = document.querySelector("#cart-items");
    const CART_TOTAL = document.querySelector("#cart-total");

    CART_ITEMS.innerHTML = "";

    cartStorage.forEach((item) => {
        const LI_ITEM = document.createElement("li");
        LI_ITEM.textContent = `Item ID: ${item.itemId} - $${item.price.toFixed(2)}`;
        CART_ITEMS.appendChild(LI_ITEM);
        total += item.price;
    });
    CART_TOTAL.textContent = total.toFixed(2);
}

function clearCart() {
    cartStorage = [];
    localStorage.removeItem("cart");
    total = 0;
    updateCartDisplay();
    updateCartCount();
}

const CHECKOUT_BTN = document.querySelector("#checkout");
CHECKOUT_BTN.addEventListener("click", () => {
    alert(`Total: $${total.toFixed(2)}. (Checkout functionality not implemented)`);
});

const CLEAR_CART_BTN = document.querySelector("#clear-cart");
CLEAR_CART_BTN.addEventListener("click", clearCart);

updateCartDisplay();
