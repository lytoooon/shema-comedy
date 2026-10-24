import { gsap, ScrollTrigger, REDUCED_MOTION } from "./motion.js";
import { getLenis } from "./smooth-scroll.js";

export function createPinnedGalleries() {
  document.querySelectorAll("[data-gallery-stage]").forEach((stage) => {
    const track = stage.querySelector(".gallery-track");
    const slides = [...track.querySelectorAll(".media-slot")];
    const progressLabel = stage.querySelector(".gallery-progress");
    const isStack = stage.dataset.layout === "stack";
    const label = stage.dataset.label;

    if (REDUCED_MOTION) {
      stage.classList.add("is-static");
      track.classList.add("is-static");
      return;
    }

    if (isStack) {
      track.classList.add("is-stack");
      const scrollDistance = () => Math.max(window.innerHeight, window.innerHeight * (slides.length - 1));
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.min(slides.length, Math.floor(self.progress * (slides.length - 1)) + 1);
            progressLabel.textContent = `${label} · ${String(current).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
          },
        },
      });

      slides.slice(0, -1).forEach((slide, index) => {
        timeline.to(slide, { xPercent: -105, ease: "none", duration: 1 }, index);
      });
      return;
    }

    const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
    const timeline = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.min(slides.length, Math.floor(self.progress * slides.length) + 1);
            progressLabel.textContent = `${label} · ${String(current).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
          },
        },
      },
    );
    const trigger = timeline.scrollTrigger;
    let pointerStart = null;

    stage.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      pointerStart = {
        x: event.clientX,
        y: event.clientY,
        scroll: trigger.scroll(),
        axis: event.pointerType === "touch" ? "y" : "x",
      };
      stage.setPointerCapture(event.pointerId);
    });

    stage.addEventListener("pointermove", (event) => {
      if (!pointerStart) return;
      const delta =
        pointerStart.axis === "y" ? pointerStart.y - event.clientY : pointerStart.x - event.clientX;
      if (Math.abs(delta) < 6) return;
      event.preventDefault();
      const nextScroll = pointerStart.scroll + delta;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(nextScroll, { immediate: true, force: true });
      else window.scrollTo({ top: nextScroll, behavior: "auto" });
      ScrollTrigger.update();
    });

    const releasePointer = () => {
      pointerStart = null;
    };
    stage.addEventListener("pointerup", releasePointer);
    stage.addEventListener("pointercancel", releasePointer);
    stage.addEventListener("lostpointercapture", releasePointer);
  });
}
