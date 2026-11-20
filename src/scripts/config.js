// Motion tuning: every "feel" setting for the animations, in one place.

export const SCROLL = {
  duration: 1.15, // smooth-scroll glide, in seconds (higher = floatier)
  anchorDuration: 1.6, // seconds for menu / button jumps to a section
};

export const REVEAL = {
  distance: 60, // px that blocks travel as they fade in
  duration: 1.1, // seconds
  stagger: 0.08, // seconds between items that enter together
  start: "top 88%", // starts when the element's top reaches 88% down the screen
};

export const MARQUEE = {
  boost: 0.12, // how much scroll speed pushes the moving bands
  edgeScale: 0.7, // partner belts: card size at the screen edges (1 = no shrink)
  edgeTurn: 28, // partner belts: degrees cards turn at the edges
};

export const FEED = {
  scrollPerPost: 0.85, // screen heights of scrolling per post in the Work story feed
};

export const STRIP = {
  maxSkew: 7, // degrees the Moments cards lean when scrolling fast
};

export const FLUID = {
  speed: 0.05, // how fast the ink drifts
  opacity: 0.26, // ink strength (0–1)
  streakStretch: 7, // how much fast scrolling stretches the ink
  streakBoost: 0.6, // how far fast scrolling pushes the ink
  ink: "#2c2621", // colour of the fine lines
  wash: "#8f857b", // colour of the soft pools
};
