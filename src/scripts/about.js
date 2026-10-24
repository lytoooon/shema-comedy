import { gsap, REDUCED_MOTION } from "./motion.js";

export function createAboutMotion() {
  if (REDUCED_MOTION) return;
  const orbit = document.querySelector(".about-orbit");
  const photos = [...orbit.querySelectorAll(".about-photo")];

  gsap.fromTo(
    orbit,
    { rotation: -14 },
    {
      rotation: 14,
      ease: "none",
      scrollTrigger: { trigger: orbit, start: "top bottom", end: "bottom top", scrub: true },
    },
  );

  photos.forEach((photo, index) => {
    const spin = index % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      photo,
      {
        rotation: -spin * (24 + index * 5),
        y: index % 2 ? 56 : -48,
        scale: 0.76,
      },
      {
        rotation: spin * (18 + index * 4),
        y: index % 2 ? -42 : 38,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: orbit, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}
