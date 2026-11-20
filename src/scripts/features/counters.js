// Numbers marked with data-count ("120K", "2.4M", "11%") count up from zero when they appear.
import { gsap, REDUCED_MOTION } from "../core/motion.js";
import { REVEAL } from "../config.js";

export function initCounters() {
  if (REDUCED_MOTION) return;

  document.querySelectorAll("[data-count]").forEach((el) => {
    const match = el.textContent.trim().match(/^(\D*)([\d.,]+)(.*)$/); // prefix, number, suffix
    if (!match) return;

    const [, prefix, number, suffix] = match;
    const target = parseFloat(number.replace(/,/g, ""));
    const decimals = number.split(".")[1]?.length ?? 0;
    const minLength = number.startsWith("0") ? number.length : 0; // keep "00" placeholders as "00"
    const format = (value) => {
      const digits = number.includes(",")
        ? value.toLocaleString("en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : value.toFixed(decimals);
      return prefix + digits.padStart(minLength, "0") + suffix;
    };

    const counter = { value: 0 };
    el.textContent = format(0);
    gsap.to(counter, {
      value: target,
      duration: 2.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
      onUpdate: () => (el.textContent = format(counter.value)),
    });
  });
}
