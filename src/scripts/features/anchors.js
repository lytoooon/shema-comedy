// In-page links (#about, #contact, the skip link…): glide to the section and move keyboard
// focus there too, so screen-reader and keyboard users land where they expect.
import { scrollToElement } from "../core/smooth-scroll.js";

export function initAnchorLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    scrollToElement(target);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.replaceState(null, "", link.hash);
  });
}
