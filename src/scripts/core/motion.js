// GSAP setup shared by every animation, plus the visitor's motion and pointer preferences.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Mobile browsers resize the viewport when the address bar hides; don't recalculate for that.
ScrollTrigger.config({ ignoreMobileResize: true });

export const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger, SplitText };
