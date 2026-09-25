"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const collaborations = [
  {
    name: "Aesop",
    category: "A little more human",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "On Running",
    category: "Run your own way",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Leica",
    category: "See differently",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "NOWNESS",
    category: "Stories worth staying for",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "The North Face",
    category: "Outside, together",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kinfolk",
    category: "The art of slowing down",
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
      if (!section.current || !ring.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".collab-card", ring.current);
      const radius = window.innerWidth < 700 ? 245 : 410;

      cards.forEach((card, index) => {
        gsap.set(card, {
          rotationY: index * (360 / cards.length),
          transformOrigin: `50% 50% ${-radius}px`,
          z: radius,
        });
      });

      gsap.to(ring.current, {
        rotationY: 360,
        rotationX: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=1700",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: section },
  );

  return (
    <section
      className="collab-section"
      id="collaborations"
      ref={section}
      aria-labelledby="collab-title"
    >
      <div className="collab-copy">
        <p className="eyebrow">Good things happen together</p>
        <h2 id="collab-title">
          A shared
          <br />
          <span>point of view.</span>
        </h2>
        <p className="collab-description">
          Thoughtful stories for people and brands who want to leave a mark.
        </p>
      </div>
      <div className="collab-stage" aria-label="Selected brand collaborations">
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
          MC
        </span>
      </div>
      <p className="collab-hint">
        <span aria-hidden="true">↻</span> Scroll to explore
      </p>
    </section>
  );
}
