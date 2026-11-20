// One shared, smoothed reading of how fast and which way the page is scrolling.
// Used by the marquees, the Moments cards and the fluid background.
import { gsap } from "./motion.js";

export const scrollMotion = {
  delta: 0, // px scrolled this frame (signed)
  velocity: 0, // smoothed px per 60fps-frame (+ down, − up)
  speed: 0, // smoothed 0…1 (0 = still, 1 = very fast)
  direction: 1, // last direction moved: 1 = down, −1 = up
};

export function trackScrollVelocity() {
  let lastY = window.scrollY;

  gsap.ticker.add(() => {
    const y = window.scrollY;
    const delta = gsap.utils.clamp(-200, 200, y - lastY);
    const perFrame = delta / gsap.ticker.deltaRatio(60); // same feel on 60Hz and 120Hz screens
    lastY = y;

    scrollMotion.delta = delta;
    scrollMotion.velocity += (perFrame - scrollMotion.velocity) * 0.15;
    scrollMotion.speed += (Math.min(Math.abs(perFrame) / 60, 1) - scrollMotion.speed) * 0.08;
    if (delta) scrollMotion.direction = Math.sign(delta);
  });
}
