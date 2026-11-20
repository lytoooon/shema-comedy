// Entry point: switches on every interactive feature. Each lives in its own file under
// features/, and each one respects "reduced motion" (content stays fully visible and usable).
import { ScrollTrigger } from "./core/motion.js";
import { startSmoothScroll } from "./core/smooth-scroll.js";
import { trackScrollVelocity } from "./core/scroll-velocity.js";
import { initAnchorLinks } from "./features/anchors.js";
import { initHeader } from "./features/header.js";
import { initMenu } from "./features/menu.js";
import { initClock } from "./features/clock.js";
import { initMagnetic } from "./features/magnetic.js";
import { initMarquees } from "./features/marquee.js";
import { initHero } from "./features/hero.js";
import { initStoryFeed } from "./features/story-feed.js";
import { initStage } from "./features/stage.js";
import { initPhotoStrip } from "./features/photo-strip.js";
import { initPhotoPile } from "./features/photo-pile.js";
import { initReveals } from "./features/reveal.js";
import { initCounters } from "./features/counters.js";
import { initFooter } from "./features/footer.js";
import { createFluidBackground } from "./fluid/index.js";

startSmoothScroll();
trackScrollVelocity();

initAnchorLinks();
initHeader();
initMenu();
initClock();
initMagnetic();
initMarquees();

// Pinned sections first, top to bottom, so everything below measures their extra scroll length.
initStoryFeed();
initStage();
initPhotoStrip();

initHero();
initPhotoPile();
initReveals();
initCounters();
initFooter();
createFluidBackground();

document.documentElement.classList.add("motion-ready");
ScrollTrigger.sort();
ScrollTrigger.refresh();
document.fonts.ready.then(() => ScrollTrigger.refresh());
