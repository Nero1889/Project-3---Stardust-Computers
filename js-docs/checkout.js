/* Cart Items and Total Count */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function addToCart(itemId, price) {
    cart.push({ itemId, price });
    updateCartDisplay();
    updateCartCount();
}
function updateCartDisplay() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const CART_ITEMS = document.querySelector("#cart-items");
    const CART_TOTAL = document.querySelector("#cart-total");

    if (CART_ITEMS && CART_TOTAL) {
        CART_ITEMS.innerHTML = "";
        total = 0;

        cart.forEach((item) => {
            const LI_ITEM = document.createElement("li");
            LI_ITEM.textContent = `Item ID: ${item.itemId} - $${item.price.toFixed(2)}`;
            CART_ITEMS.appendChild(LI_ITEM);
            total += item.price;
        });
        CART_TOTAL.textContent = total.toFixed(2);
    }
}
function updateCartCount() {
    const CART_COUNTS = document.querySelectorAll(".total-items");
    if (CART_COUNTS) CART_COUNTS.forEach((count) => count.textContent = cart.length);
}
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    total = 0;
    updateCartDisplay();
    updateCartCount();
}

const ADD_TO_CART_BTN = document.querySelectorAll("[item-id][item-price] .buy");
ADD_TO_CART_BTN.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const ITEM_DIV = event.target.closest("[item-id][item-price]");
        const ITEM_ID = ITEM_DIV.getAttribute("item-id");
        const PRICE = parseFloat(ITEM_DIV.getAttribute("item-price"));
        addToCart(ITEM_ID, PRICE);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    total = cart.reduce((sum, item) => sum + item.price, 0);
    updateCartCount();
    updateCartDisplay(); 

    const CHECKOUT_MODAL = document.querySelector("#checkout-modal");
    const CHECKOUT_BTN = document.querySelector("#checkout");
    const CHECKOUT_TOTAL = document.querySelector("#checkout-total");
    const CHECKOUT_CLOSE = document.querySelector(".checkout-close");
    const CHECKOUT_FORM = document.querySelector("#checkout-form");

    if (CHECKOUT_BTN) {
        CHECKOUT_BTN.addEventListener("click", () => {
            CHECKOUT_TOTAL.textContent = total.toFixed(2);
            CHECKOUT_MODAL.style.display = "block";
        });
    }
    if (CHECKOUT_CLOSE) {
        CHECKOUT_CLOSE.addEventListener("click", () => CHECKOUT_MODAL.style.display = "none");
    }

    window.addEventListener("click", (event) => {
        if (event.target === CHECKOUT_MODAL) CHECKOUT_MODAL.style.display = "none";
    });
    if (CHECKOUT_FORM) {
        CHECKOUT_FORM.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for your purchase!");
            clearCart();
            CHECKOUT_MODAL.style.display = "none";
        });
    }

    const CART_MODAL = document.querySelector("#cart-modal");
    const SHOPPING_CART_ICON = document.querySelector(".shopping-cart");
    const CLOSE_BTN = document.querySelector(".close-btn");
    const CLEAR_CART_BTN = document.querySelector("#clear-cart");
    const MOBILE_CART_ICON = document.querySelector(".mobile-shopping-cart");

    if (MOBILE_CART_ICON && CART_MODAL) {
        MOBILE_CART_ICON.addEventListener("click", () => {
            CART_MODAL.style.display = "block";
            updateCartDisplay();
        });
    }
    if (SHOPPING_CART_ICON && CART_MODAL && CLOSE_BTN) {
        SHOPPING_CART_ICON.addEventListener("click", () => {
            CART_MODAL.style.display = "block";
            updateCartDisplay();
        });
        CLOSE_BTN.addEventListener("click", () => CART_MODAL.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === CART_MODAL) CART_MODAL.style.display = "none";
        });
    }
    if (CLEAR_CART_BTN) CLEAR_CART_BTN.addEventListener("click", clearCart);
});
    
updateCartCount();
