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
if (CURRENT_THEME === "dark") {
    document.body.classList.add("dark-mode");
}

THEME_TOGGLE_BTNS.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.removeItem("theme", "dark");
        }

        document.body.style.transition = "background-color .2s ease-in-out";
    });
}); 