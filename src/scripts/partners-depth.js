import { gsap, REDUCED_MOTION } from "./motion.js";
import { PARTNER_EDGE_SCALE } from "./config.js";

export function createPartnerDepth() {
  if (REDUCED_MOTION) return;
  const marks = [...document.querySelectorAll(".partner-mark")];
  const updateDepth = () => {
    const center = window.innerWidth / 2;
    const radius = center || 1;

    marks.forEach((mark) => {
      const rect = mark.getBoundingClientRect();
      const offset = (rect.left + rect.width / 2 - center) / radius;
      const distance = Math.min(1, Math.abs(offset));
      const curve = distance * distance * (3 - 2 * distance);
      const scale = 1 - (1 - PARTNER_EDGE_SCALE) * curve;
      const tilt = Math.max(-30, Math.min(30, offset * 30));
      mark.style.setProperty("--center-scale", scale.toFixed(3));
      mark.style.setProperty("--edge-turn", `${tilt.toFixed(1)}deg`);
    });
  };

  gsap.ticker.add(updateDepth);
  window.addEventListener("resize", updateDepth, { passive: true });
  updateDepth();
}
