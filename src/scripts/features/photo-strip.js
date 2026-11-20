// Moments section: pins and slides the photo row sideways as you scroll. The giant backdrop
// words move slower for depth, and the cards lean into fast scrolling.
import { gsap, REDUCED_MOTION } from "../core/motion.js";
import { scrollMotion } from "../core/scroll-velocity.js";
import { STRIP } from "../config.js";

export function initPhotoStrip() {
  const strip = document.querySelector("[data-strip]");
  if (!strip || REDUCED_MOTION) return;

  const track = strip.querySelector("[data-strip-track]");
  const backdrop = strip.querySelector("[data-strip-backdrop]");
  const progress = strip.querySelector("[data-strip-progress]");
  strip.classList.add("is-enhanced");

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const timeline = gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: strip,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
    .to(track, { x: () => -distance() }, 0)
    .fromTo(backdrop, { x: () => window.innerWidth * 0.3 }, { x: () => -backdrop.offsetWidth * 0.45 }, 0)
    .fromTo(progress, { scaleX: 0 }, { scaleX: 1 }, 0);

  // Lean: follow the scroll speed while pinned, settle back to upright otherwise.
  let skew = 0;
  gsap.ticker.add(() => {
    const target = timeline.scrollTrigger.isActive
      ? gsap.utils.clamp(-STRIP.maxSkew, STRIP.maxSkew, -scrollMotion.velocity * 0.25)
      : 0;
    if (Math.abs(target - skew) < 0.01 && Math.abs(skew) < 0.01) return;
    skew += (target - skew) * 0.12;
    track.style.setProperty("--skew", `${skew.toFixed(2)}deg`);
  });
}
