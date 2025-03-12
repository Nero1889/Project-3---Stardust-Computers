/* Cart Item and Total Count */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function addToCart(itemId, price) {
    cart.push({itemId, price});
    updateCartDisplay();
    updateCartCount();
}
const CART_MODAL = document.querySelector("#cart-modal");
const SHOPPING_CART_ICON = document.querySelector(".shopping-cart");
const CLOSE_BTN = document.querySelector(".close-btn");

SHOPPING_CART_ICON.addEventListener("click", () => {
    CART_MODAL.style.display = "block";
    updateCartDisplay();
});

CLOSE_BTN.addEventListener("click", () => {
    CART_MODAL.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === CART_MODAL) {
        CART_MODAL.style.display = "none";
    }
});

function updateCartDisplay() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const CART_ITEMS = document.querySelector("#cart-items");
    const CART_TOTAL = document.querySelector("#cart-total");

    if (CART_ITEMS && CART_TOTAL && CART_MODAL.style.display === "block") {
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
    const CART_COUNT = document.querySelector(".total-items");
    if (CART_COUNT) {
        CART_COUNT.textContent = cart.length;
    }
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
    btn.addEventListener("click", event => {
        const ITEM_DIV = event.target.closest("[item-id][item-price]");
        const ITEM_ID = ITEM_DIV.getAttribute("item-id");
        const PRICE = parseFloat(ITEM_DIV.getAttribute("item-price"));
        addToCart(ITEM_ID, PRICE);
    });
});

window.addEventListener("load", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    total = 0;
    cart.forEach((item) => {
        total += item.price;
    }); 
    updateCartCount();
    updateCartDisplay();
});

const CHECKOUT_BTN = document.querySelector("#checkout");
if (CHECKOUT_BTN) {
    CHECKOUT_BTN.addEventListener("click", () => {
        alert(`Total: ${total.toFixed(2)}. (Checkout functionality not implemented)`);
    });
}

const CLEAR_CART_BTN = document.querySelector("#clear-cart");
if (CLEAR_CART_BTN) {
    CLEAR_CART_BTN.addEventListener("click", clearCart);
}

updateCartCount();
