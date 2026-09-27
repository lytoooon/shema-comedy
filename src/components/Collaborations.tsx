"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const collaborations = [
  {
    name: "Campus life",
    category: "The student experience",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zambian moments",
    category: "Everyday life, close to home",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Quick sketches",
    category: "Short-form comedy",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Local humor",
    category: "A familiar point of view",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Student stories",
    category: "Life around UNZA",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Everyday characters",
    category: "A face you might know",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Collaborations() {
  const section = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const sectionElement = section.current;
      const ringElement = ring.current;
      if (!sectionElement || !ringElement) return;

      const cards = gsap.utils.toArray<HTMLElement>(".collab-card", ringElement);
      const radius = window.innerWidth < 700 ? 245 : 410;

      cards.forEach((card, index) => {
        gsap.set(card, {
          rotationY: index * (360 / cards.length),
          transformOrigin: `50% 50% ${-radius}px`,
          z: radius,
        });
      });

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ringElement, {
          rotationY: 360,
          rotationX: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionElement,
            scroller: sectionElement.closest(".feed-scroll"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: section },
  );

  return (
    <section
      className="collab-section"
      id="collaborations"
      ref={section}
      data-feed-panel
      aria-labelledby="collab-title"
    >
      <div className="collab-copy">
        <p className="eyebrow">A little humor hits close to home</p>
        <h2 id="collab-title">
          The funny
          <br />
          <span>in the familiar.</span>
        </h2>
        <p className="collab-description">
          Skits and relatable stories inspired by Zambian life and the student experience.
        </p>
      </div>
      <div className="collab-stage" aria-label="Comedy themes">
        <div className="collab-orbit collab-orbit--outer" />
        <div className="collab-orbit collab-orbit--inner" />
        <div className="collab-ring" ref={ring}>
          {collaborations.map((item) => (
            <article
              className="collab-card"
              key={item.name}
              style={{ backgroundImage: `url("${item.image}")` }}
            >
              <span className="collab-card__overlay" />
              <span className="collab-card__label">
                <span>{item.category}</span>
                <strong>{item.name}</strong>
              </span>
            </article>
          ))}
        </div>
        <span className="collab-center" aria-hidden="true">
          SC
        </span>
      </div>
      <p className="collab-hint">
        <span aria-hidden="true">↻</span> Scroll to explore
      </p>
    </section>
  );
}
