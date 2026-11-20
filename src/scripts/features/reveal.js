// Scroll reveals, declared in the HTML:
//   data-reveal              fades + slides up (or data-reveal="left" | "right" | "scale" | "fade")
//   data-split               heading lines slide up from behind a mask
//   data-split data-marker   …then a highlighter swipes behind its *emphasized* words
// Each plays once, when it enters the screen.
import { gsap, ScrollTrigger, SplitText, REDUCED_MOTION } from "../core/motion.js";
import { REVEAL } from "../config.js";

const START_STATES = {
  up: { y: REVEAL.distance },
  left: { x: -REVEAL.distance },
  right: { x: REVEAL.distance },
  scale: { scale: 0.85 },
  fade: {},
};

export function initReveals() {
  if (REDUCED_MOTION) return;
  revealBlocks();
  revealHeadings();
}

function revealBlocks() {
  const blocks = gsap.utils.toArray("[data-reveal]");
  blocks.forEach((el) =>
    gsap.set(el, { autoAlpha: 0, ...(START_STATES[el.dataset.reveal] ?? START_STATES.up) }),
  );

  // Items entering together (e.g. a row of stats) are staggered.
  ScrollTrigger.batch(blocks, {
    start: REVEAL.start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: REVEAL.duration,
        ease: "expo.out",
        stagger: REVEAL.stagger,
        overwrite: true,
      }),
  });
}

function revealHeadings() {
  gsap.utils.toArray("[data-split]").forEach((heading) => {
    let revealed = false;

    SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true, // re-split when fonts load or the width changes
      onSplit(self) {
        if (revealed) return; // already shown: don't replay after a resize

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: heading, start: REVEAL.start, once: true },
          onComplete: () => (revealed = true),
        });
        timeline.from(self.lines, {
          yPercent: 115,
          rotation: 3,
          transformOrigin: "0% 0%",
          duration: REVEAL.duration * 1.15,
          ease: "expo.out",
          stagger: REVEAL.stagger,
        });

        if (heading.hasAttribute("data-marker")) {
          timeline.fromTo(
            heading.querySelectorAll("em"),
            { "--mark": "0%" },
            { "--mark": "100%", duration: 0.9, ease: "power3.inOut", stagger: 0.15 },
            "-=0.6",
          );
        }
        return timeline;
      },
    });
  });
}
