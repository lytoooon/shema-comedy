// Lenis smooth scrolling, driven by GSAP's ticker so scroll and animations share one frame loop.
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "./motion.js";
import { SCROLL } from "../config.js";

let lenis = null;

/** The Lenis instance, or null when smooth scrolling is off (reduced motion). */
export const getLenis = () => lenis;

export function startSmoothScroll() {
  if (REDUCED_MOTION) return;

  lenis = new Lenis({ duration: SCROLL.duration });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000)); // GSAP time is in seconds, Lenis expects ms
  gsap.ticker.lagSmoothing(0);
}

/** Glides to an element (or jumps there when motion is reduced). */
export function scrollToElement(target) {
  if (lenis) lenis.scrollTo(target, { duration: SCROLL.anchorDuration });
  else target.scrollIntoView();
}
