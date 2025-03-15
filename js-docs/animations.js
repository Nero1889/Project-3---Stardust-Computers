/* Wave Loading Effect */
const ITEM = document.querySelectorAll(".item");

function animateElements(elements, delay) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("loaded");
        }, index * delay);
    });
}

function loadProducts() {
    animateElements(ITEM, 100);
}

document.addEventListener("DOMContentLoaded", loadProducts);