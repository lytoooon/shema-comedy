import { ScrollTrigger } from "./motion.js";
import { initMobileMenu } from "./menu.js";
import { createPinnedGalleries } from "./gallery.js";
import { createScrollReveals } from "./reveal.js";
import { createAboutMotion } from "./about.js";
import { createPartnerDepth } from "./partners-depth.js";
import { startSmoothScroll } from "./smooth-scroll.js";
import { createFluidBackground } from "./fluid/index.js";

initMobileMenu();

// Pinned galleries first, so later triggers measure below their pin spacers.
createPinnedGalleries();
createScrollReveals();
createAboutMotion();
createPartnerDepth();
startSmoothScroll();
createFluidBackground();

document.fonts.ready.then(() => ScrollTrigger.refresh());
