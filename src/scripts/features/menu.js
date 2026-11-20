// Full-screen menu on small screens. While open, the page behind is frozen and made
// `inert` so Tab stays inside the menu; Escape or any link closes it.
import { getLenis } from "../core/smooth-scroll.js";

export function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  const label = toggle.querySelector("[data-menu-label]");
  const pageBehind = document.querySelectorAll("main, footer, .skip-link");
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  function setOpen(open, { returnFocus = true } = {}) {
    if (open === isOpen()) return;

    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Close menu" : "Open menu";
    menu.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    pageBehind.forEach((element) => (element.inert = open));

    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      menu.querySelector("a")?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      if (returnFocus) toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Close first, so smooth scrolling is running again when the link scrolls the page.
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false, { returnFocus: false });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) setOpen(false);
  });

  window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false, { returnFocus: false });
  });
}
