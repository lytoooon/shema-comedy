// Buttons marked data-magnetic lean towards the mouse pointer (mouse/trackpad only).
import { gsap, REDUCED_MOTION, FINE_POINTER } from "../core/motion.js";

const STRENGTH = 0.3; // share of the pointer's distance from the centre that the button follows

export function initMagnetic() {
  if (REDUCED_MOTION || !FINE_POINTER) return;

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      toX((event.clientX - box.left - box.width / 2) * STRENGTH);
      toY((event.clientY - box.top - box.height / 2) * STRENGTH);
    });
    el.addEventListener("pointerleave", () => {
      toX(0);
      toY(0);
    });
  });
}
