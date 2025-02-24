/* Mobile Navbar */
const HEADER_BARS = document.querySelector("#header-bars");
const MOBILE_NAV = document.querySelector("#mobile-nav");
const MOBILE_LINKS = document.querySelectorAll(".mobile-link");
let isMobileNavOpen = false;
    
HEADER_BARS.addEventListener("click", () => {
        isMobileNavOpen = !isMobileNavOpen;

    if (isMobileNavOpen) {
        MOBILE_NAV.style.display = "flex";
        document.body.style.overflowY = "hidden";
    } else {
        MOBILE_NAV.style.display = "none";
        document.body.style.overflowY = "auto";
    }
});

MOBILE_LINKS.forEach(link => {
    link.addEventListener("click", () => {
        isMobileNavOpen = !isMobileNavOpen;

        MOBILE_NAV.style.display = "none";
        document.body.style.overflowY = "auto";
    });
});

/* Change Theme */
const THEME_TOGGLE_BTNS = document.querySelectorAll(".theme-toggle");
const CURRENT_THEME = localStorage.getItem("theme");

if (CURRENT_THEME === "light") {
    document.body.classList.add("light-mode");
}

THEME_TOGGLE_BTNS.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        document.body.classList.contains("light-mode")
        ? localStorage.setItem("theme", "light")
        : localStorage.removeItem("theme");
        
        document.body.style.transition = "background-color .2s ease-in-out";
    });
}); 

/* Search Engine (Prototype) */
const SEARCH_INPUT = document.querySelector(".search-engine");
const STORE_CONTAINERS = document.querySelectorAll(".store-container");

SEARCH_INPUT.addEventListener("input", () => {
    const SEARCH_TERM = SEARCH_INPUT.value.toLowerCase();

    STORE_CONTAINERS.forEach(container => {
        const ITEMS = container.querySelectorAll(".item");
        const PARTS = container.querySelectorAll(".parts");

        ITEMS.forEach(item => {
            const KEYWORDS = item.dataset.keywords.toLowerCase();
            KEYWORDS.includes(SEARCH_TERM)
            ? item.classList.remove("hidden")
            : item.classList.add("hidden");
        });

        PARTS.forEach(part => {
            const KEYWORDS = part.dataset.keywords.toLowerCase();
            KEYWORDS.includes(SEARCH_TERM)
            ? part.classList.remove("hidden")
            : part.classList.add("hidden");
        });
    });
});
