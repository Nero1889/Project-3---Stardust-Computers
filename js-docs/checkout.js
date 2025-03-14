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
        CART_ITEMS.innerHTML = cart
        .map((item) => `<li>Item ID: ${item.itemId} - $${item.price.toFixed(2)}</li>`)
        .join("");
        total = cart.reduce((sum, item) => sum + item.price, 0);
        CART_TOTAL.textContent = total.toFixed(2);
    }
}

function updateCartCount() {
    document.querySelectorAll(".total-items")?.forEach((count) => (count.textContent = cart.length));
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    total = 0;
    updateCartDisplay();
    updateCartCount();
}

function openModal(modal) {
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
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
            const SALES_TAX_RATE = 0.05;
            const SALES_TAX = total * SALES_TAX_RATE;
            const TOTAL_WITH_TAX = total + SALES_TAX; 
            CHECKOUT_TOTAL.textContent = TOTAL_WITH_TAX.toFixed(2);
            openModal(CHECKOUT_MODAL);
        });
    }

    if (CHECKOUT_CLOSE) CHECKOUT_CLOSE.addEventListener("click", () => closeModal(CHECKOUT_MODAL));
    
    window.addEventListener("click", (event) => {
        if (event.target === CHECKOUT_MODAL) closeModal(CHECKOUT_MODAL);
    });

    if (CHECKOUT_FORM) {
        CHECKOUT_FORM.addEventListener("submit", (event) => {
            event.preventDefault();

            const SALES_TAX_RATE = 0.05;
            const SALES_TAX = total * SALES_TAX_RATE;
            const TOTAL_WITH_TAX = total + SALES_TAX;
            const TOTAL_DUE_INPUT = document.querySelector("#total-due-input");
            const ENTERED_TOTAL = parseFloat(TOTAL_DUE_INPUT.value);

            if (ENTERED_TOTAL >= parseFloat(TOTAL_WITH_TAX.toFixed(2))) {
                alert("Thank you for your purchase!");
                clearCart();
                closeModal(CHECKOUT_MODAL);
            } else alert("Insufficient funds! Please try again");
        });
    }

    const CART_MODAL = document.querySelector("#cart-modal");
    const SHOPPING_CART_ICON = document.querySelector(".shopping-cart");
    const CLOSE_BTN = document.querySelector(".close-btn");
    const CLEAR_CART_BTN = document.querySelector("#clear-cart");
    const MOBILE_CART_ICON = document.querySelector(".mobile-shopping-cart");

    if (MOBILE_CART_ICON && CART_MODAL) {
        MOBILE_CART_ICON.addEventListener("click", () => {
            openModal(CART_MODAL);
            updateCartDisplay();
        });
    }

    if (SHOPPING_CART_ICON && CART_MODAL && CLOSE_BTN) {
        SHOPPING_CART_ICON.addEventListener("click", () => {
            openModal(CART_MODAL);
            updateCartDisplay();
        });
        CLOSE_BTN.addEventListener("click", () => closeModal(CART_MODAL));

        window.addEventListener("click", (event) => {
            if (event.target === CART_MODAL) closeModal(CART_MODAL);
        });
    }
    if (CLEAR_CART_BTN) CLEAR_CART_BTN.addEventListener("click", clearCart);
});

updateCartCount();
