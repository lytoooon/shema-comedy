// Work section: a pinned, phone-style story feed. Each stretch of scrolling fills a story bar,
// then the next post swipes up over the last one while the blurred backdrop cross-fades.
import { gsap, REDUCED_MOTION } from "../core/motion.js";
import { FEED } from "../config.js";
import { pad } from "../../lib/text.js";

export function initStoryFeed() {
  const feed = document.querySelector("[data-feed]");
  if (!feed || REDUCED_MOTION) return;

  const cards = gsap.utils.toArray("[data-feed-card]", feed);
  const backdrops = gsap.utils.toArray("[data-feed-backdrop]", feed);
  const bars = gsap.utils.toArray("[data-feed-bar]", feed);
  const counter = feed.querySelector("[data-feed-current]");
  const count = cards.length;
  if (count < 2) return;

  feed.classList.add("is-enhanced");
  gsap.set(cards.slice(1), { yPercent: 100 });

  let shown = 0;
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: feed,
      start: "top top",
      end: () => `+=${window.innerHeight * FEED.scrollPerPost * count}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(count - 1, Math.floor(self.progress * count));
        if (index !== shown) counter.textContent = pad((shown = index) + 1);
      },
    },
  });

  // One unit of timeline per post: its bar fills, and just before the end the next post arrives.
  bars.forEach((bar, i) => timeline.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i));

  cards.slice(1).forEach((card, n) => {
    const swipe = { duration: 0.3, ease: "power2.inOut" };
    const at = n + 0.7;
    timeline
      .to(card, { yPercent: 0, ...swipe }, at)
      .to(cards[n], { yPercent: -20, scale: 0.92, filter: "brightness(0.45)", ...swipe }, at)
      .to(backdrops[n + 1], { opacity: 1, ...swipe }, at);
  });
}
