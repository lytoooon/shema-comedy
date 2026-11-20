// Footer: the giant name is sized to fill the width exactly, and its letters rise into place,
// fanned out, as the footer scrolls in.
import { gsap, REDUCED_MOTION } from "../core/motion.js";

export function initFooter() {
  const wordmark = document.querySelector("[data-footer-wordmark]");
  if (!wordmark) return;

  const letters = [...wordmark.children];
  fitToWidth(wordmark, letters);
  window.addEventListener("resize", () => fitToWidth(wordmark, letters), { passive: true });
  document.fonts.ready.then(() => fitToWidth(wordmark, letters));

  if (REDUCED_MOTION) return;
  const middle = (letters.length - 1) / 2;
  gsap.from(letters, {
    yPercent: 70,
    rotation: (i) => (i - middle) * 8,
    stagger: 0.04,
    ease: "none",
    scrollTrigger: { trigger: wordmark, start: "top bottom", end: "bottom bottom", scrub: 1 },
  });
}

function fitToWidth(wordmark, letters) {
  wordmark.style.fontSize = "";
  const size = parseFloat(getComputedStyle(wordmark).fontSize);
  const textWidth = letters.reduce((sum, letter) => sum + letter.offsetWidth, 0);
  if (textWidth) wordmark.style.fontSize = `${(size * wordmark.clientWidth * 0.97) / textWidth}px`;
}
