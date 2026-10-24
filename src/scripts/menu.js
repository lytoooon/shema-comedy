export function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#site-menu");
  const setOpen = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menu.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) {
      setOpen(false);
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", () => setOpen(false));
}
