import { gsap, ScrollTrigger, REDUCED_MOTION } from "./motion.js";
import { REVEAL_DISTANCE, TRANSITION_TURN, REVEAL_START, REVEAL_END } from "./config.js";

function getRevealStart(element) {
  const direction = element.dataset.reveal;
  const motion = element.dataset.motion || "drift";
  const distance = REDUCED_MOTION ? 0 : REVEAL_DISTANCE;
  const turn = REDUCED_MOTION ? 0 : TRANSITION_TURN;
  const presets = {
    scatter: { y: distance * 0.8, rotation: turn * -1, scale: 0.55, skewX: turn * 0.6 },
    whip: {
      x: direction === "right" ? distance * 1.6 : -distance * 1.6,
      rotation: direction === "right" ? turn : -turn,
      scale: 0.72,
      skewX: turn * 0.45,
    },
    fold: {
      y: distance,
      rotationX: -turn * 3.2,
      rotationZ: turn * 0.4,
      scaleY: 0.55,
      transformOrigin: "50% 100%",
    },
    spin: { y: distance * 0.45, rotationY: -turn * 4, rotationZ: turn * 0.8, scale: 0.5 },
    portrait: { y: distance * 0.3, rotationZ: -turn * 0.45, scale: 0.68 },
    drift: { y: distance * 0.65, rotationZ: turn * -0.6, scale: 0.8 },
  };
  const start = presets[motion] || presets.drift;

  if (REDUCED_MOTION) return { autoAlpha: 0 };
  return { ...start, autoAlpha: 0, filter: "blur(8px)" };
}

export function createScrollReveals() {
  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    if (element.closest(".hero")) return;

    const start = getRevealStart(element);
    const isFinalChapter = Boolean(element.closest(".chapter-contact"));
    const end = {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      scaleY: 1,
      skewX: 0,
      filter: "blur(0px)",
      ease: "none",
    };
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: REVEAL_START,
        end: isFinalChapter ? "top center" : REVEAL_END,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    timeline.fromTo(element, start, { ...end, duration: 0.5 });

    if (!element.closest(".chapter-contact")) {
      timeline.to(
        element,
        {
          autoAlpha: 0,
          y: REDUCED_MOTION ? 0 : -REVEAL_DISTANCE * 0.35,
          filter: REDUCED_MOTION ? "blur(0px)" : "blur(5px)",
          ease: "none",
          duration: 0.2,
        },
        0.8,
      );
    }
  });
}
