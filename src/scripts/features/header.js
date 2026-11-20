// Header: gains a frosted background once you scroll, hides while scrolling down,
// comes back when scrolling up, and drives the red progress line at the top of the screen.
import { gsap, ScrollTrigger } from "../core/motion.js";

export function initHeader() {
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-scroll-progress]");
  if (!header) return;

  const setProgress = progress ? gsap.quickSetter(progress, "scaleX") : () => {};

  const update = (self) => {
    const y = self.scroll();
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", self.direction === 1 && y > window.innerHeight * 0.5);
    setProgress(self.progress);
  };

  ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });

  // Always show the header again when keyboard focus moves into it.
  header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
}
