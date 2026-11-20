// Hero scroll parallax: as you scroll away, the "SHEMA" letters fly apart, the portrait sinks,
// and the outlined "COMEDY" fills with red. (The entrance animation is CSS, in Hero.astro.)
import { gsap, REDUCED_MOTION } from "../core/motion.js";

export function initHero() {
  const hero = document.querySelector("[data-hero]");
  if (!hero || REDUCED_MOTION) return;

  const offset = (el) => Number(el.style.getPropertyValue("--d")) || 0; // letter's distance from the middle

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .to(
      "[data-hero-char]",
      {
        x: (i, el) => offset(el) * window.innerWidth * 0.06,
        yPercent: (i, el) => -30 - Math.abs(offset(el)) * 18,
        rotation: (i, el) => offset(el) * 7,
      },
      0,
    )
    .to("[data-hero-fill]", { "--fill": "100%", duration: 0.55 }, 0)
    .to("[data-hero-portrait]", { yPercent: 10, scale: 1.05, transformOrigin: "50% 100%" }, 0)
    .to("[data-hero-fade]", { y: -80, autoAlpha: 0, duration: 0.5 }, 0);
}
