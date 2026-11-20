// Endless bands (components/ui/Marquee.astro). Options come from data attributes:
//   data-speed      base speed in px per second
//   data-direction  1 = moves left, −1 = moves right
//   data-flip       reverse when the visitor scrolls up
//   data-depth      items shrink and turn away near the screen edges (curved belt)
// Scrolling makes every band speed up. Bands only animate while on screen.
import { gsap, REDUCED_MOTION } from "../core/motion.js";
import { scrollMotion } from "../core/scroll-velocity.js";
import { MARQUEE } from "../config.js";

export function initMarquees() {
  document.querySelectorAll("[data-marquee]").forEach(createMarquee);
}

function createMarquee(marquee) {
  const track = marquee.querySelector(".marquee-track");
  const [group, copy] = track.children;
  const originals = [...group.children];
  const speed = Number(marquee.dataset.speed) || 60;
  const baseDirection = Number(marquee.dataset.direction) || 1;
  const flips = marquee.hasAttribute("data-flip");
  const hasDepth = marquee.hasAttribute("data-depth");

  track.style.position = "relative"; // makes item.offsetLeft relative to the track

  // Repeat the content until one group is wider than the band, so the loop never shows a gap.
  function fillWidth() {
    for (let round = 0; round < 12 && group.offsetWidth < marquee.offsetWidth; round++) {
      for (const item of originals) {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        group.append(clone);
        copy.append(clone.cloneNode(true));
      }
    }
  }

  fillWidth();
  if (REDUCED_MOTION) return;

  let x = 0;
  let width = 0;
  let originLeft = 0;
  let items = [];
  let visible = false;
  let direction = baseDirection;

  function measure() {
    fillWidth();
    width = group.offsetWidth;
    originLeft = marquee.getBoundingClientRect().left;
    items = [...track.querySelectorAll(":scope > .marquee-group > *")].map((el) => ({
      el,
      centre: el.offsetLeft + el.offsetWidth / 2,
    }));
  }

  function applyDepth() {
    const half = window.innerWidth / 2;
    for (const { el, centre } of items) {
      const offset = (originLeft + x + centre - half) / half; // −1 left edge … 1 right edge
      const distance = Math.min(1, Math.abs(offset));
      const eased = distance * distance * (3 - 2 * distance);
      el.style.setProperty("--scale", (1 - (1 - MARQUEE.edgeScale) * eased).toFixed(3));
      el.style.setProperty("--turn", `${(gsap.utils.clamp(-1, 1, offset) * MARQUEE.edgeTurn).toFixed(1)}deg`);
    }
  }

  gsap.ticker.add((time, deltaTime) => {
    if (!visible || !width) return;
    if (flips) direction = baseDirection * scrollMotion.direction;
    const boost = 1 + Math.abs(scrollMotion.velocity) * MARQUEE.boost;
    x = gsap.utils.wrap(-width, 0, x - direction * speed * boost * (deltaTime / 1000));
    track.style.transform = `translate3d(${x}px, 0, 0)`;
    if (hasDepth) applyDepth();
  });

  // Re-measure only when the band's width really changes (not on every content change).
  let measuredWidth = -1;
  const remeasure = () => {
    if (marquee.offsetWidth === measuredWidth) return;
    measuredWidth = marquee.offsetWidth;
    measure();
  };

  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(marquee);
  new ResizeObserver(remeasure).observe(marquee);
  document.fonts.ready.then(measure);
}
