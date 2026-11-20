// About polaroids: start gathered in a neat pile, then fan out to their CSS positions as you scroll.
import { gsap, REDUCED_MOTION } from "../core/motion.js";

export function initPhotoPile() {
  const pile = document.querySelector("[data-photo-pile]");
  if (!pile || REDUCED_MOTION) return;

  const cards = gsap.utils.toArray("[data-polaroid]", pile);
  const toPileCentre = (axis) => (i, el) =>
    axis === "x"
      ? pile.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2)
      : pile.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2);

  gsap.from(cards, {
    x: toPileCentre("x"),
    y: toPileCentre("y"),
    rotation: (i) => [-5, 4, -2, 6][i % 4],
    scale: 0.92,
    ease: "none",
    scrollTrigger: {
      trigger: pile,
      start: "top 92%",
      end: "center 55%",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}
