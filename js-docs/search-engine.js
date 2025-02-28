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