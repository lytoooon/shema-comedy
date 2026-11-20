// Results "stage": the section pins while its words light up one by one, and a spotlight
// follows the pointer (or drifts on its own on touch screens).
import { gsap, ScrollTrigger, SplitText, REDUCED_MOTION, FINE_POINTER } from "../core/motion.js";

export function initStage() {
  const stage = document.querySelector("[data-stage]");
  if (!stage || REDUCED_MOTION) return;

  const heading = stage.querySelector("h2");
  const { words } = SplitText.create(heading, { type: "words" });

  gsap.fromTo(
    words,
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.12,
      ease: "none",
      scrollTrigger: { trigger: stage, start: "top top", end: "+=110%", pin: true, scrub: true },
    },
  );

  followSpotlight(stage, stage.querySelector("[data-stage-light]"));
}

function followSpotlight(stage, light) {
  const position = { x: 50, y: 45 };
  const apply = () => {
    light.style.setProperty("--x", `${position.x}%`);
    light.style.setProperty("--y", `${position.y}%`);
  };

  if (FINE_POINTER) {
    const toX = gsap.quickTo(position, "x", { duration: 0.9, ease: "power3", onUpdate: apply });
    const toY = gsap.quickTo(position, "y", { duration: 0.9, ease: "power3", onUpdate: apply });
    stage.addEventListener("pointermove", (event) => {
      const box = stage.getBoundingClientRect();
      toX(((event.clientX - box.left) / box.width) * 100);
      toY(((event.clientY - box.top) / box.height) * 100);
    });
    return;
  }

  // Touch: two out-of-sync loops trace a lazy figure-of-eight, only while the stage is on screen.
  const drift = gsap
    .timeline({ paused: true, onUpdate: apply })
    .to(position, { x: 72, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true }, 0)
    .to(position, { y: 60, duration: 2.3, ease: "sine.inOut", repeat: -1, yoyo: true }, 0);
  ScrollTrigger.create({
    trigger: stage,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? drift.play() : drift.pause()),
  });
}
