import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "./motion.js";
import { LENIS_DURATION } from "./config.js";

let lenis = null;
export const getLenis = () => lenis;

export function startSmoothScroll() {
  if (REDUCED_MOTION) return;

  lenis = new Lenis({
    duration: LENIS_DURATION,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
