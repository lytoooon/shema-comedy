"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const panelActions = [
  ["Like", "Skits", "About", "TikTok"],
  ["Like this skit", "More skits", "About", "TikTok"],
  ["Like", "Explore", "About", "TikTok"],
  ["Like", "About Shema", "Birthday", "TikTok"],
  ["Like", "Comedy", "Back to top", "TikTok"],
];

const panelTargets = [
  ["#hero", "#collaborations", "#life", "https://www.tiktok.com/@shema_comedy"],
  ["#work", "#collaborations", "#life", "https://www.tiktok.com/@shema_comedy"],
  ["#collaborations", "#work", "#life", "https://www.tiktok.com/@shema_comedy"],
  ["#life", "#work", "#life", "https://www.tiktok.com/@shema_comedy"],
  ["#contact", "#collaborations", "#hero", "https://www.tiktok.com/@shema_comedy"],
];

function RailIcon({ name }: { name: "heart" | "comment" | "bookmark" | "share" }) {
  if (name === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.7c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
      </svg>
    );
  }

  if (name === "comment") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.2-3.2A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M8.5 11.5h.01m3.49 0h.01m3.49 0h.01" />
      </svg>
    );
  }

  if (name === "bookmark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 20V5.5A2.5 2.5 0 0 1 9 3h6a2.5 2.5 0 0 1 2.5 2.5V20L12 16.5 6.5 20Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 4 21 11.5 13.5 19v-4.2C8.6 14.7 5 16.2 3 20c0-6.8 3.5-10.4 10.5-10.4V4Z" />
    </svg>
  );
}

function ActionRail({ activePanel }: { activePanel: number }) {
  const [likedPanels, setLikedPanels] = useState<number[]>([]);
  const actionIcons = ["heart", "comment", "bookmark", "share"] as const;
  const actions = panelActions[activePanel] ?? panelActions[0];
  const targets = panelTargets[activePanel] ?? panelTargets[0];

  function toggleLike() {
    setLikedPanels((current) =>
      current.includes(activePanel)
        ? current.filter((panel) => panel !== activePanel)
        : [...current, activePanel],
    );
  }

  return (
    <nav className="action-rail" aria-label="Quick actions">
      {actionIcons.map((icon, index) => {
        const label = actions[index];
        const target = targets[index];

        if (icon === "heart") {
          const isLiked = likedPanels.includes(activePanel);
          return (
            <button
              className={`rail-action${isLiked ? " is-liked" : ""}`}
              type="button"
              key={icon}
              onClick={toggleLike}
              aria-label={`${isLiked ? "Unlike" : "Like"}: ${label}`}
              aria-pressed={isLiked}
            >
              <span className="rail-action__icon">
                <RailIcon name={icon} />
              </span>
              <span className="rail-action__label">{label}</span>
            </button>
          );
        }

        return (
          <a
            className="rail-action"
            key={icon}
            href={target}
            aria-label={label}
            {...(target.startsWith("https://") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="rail-action__icon">
              <RailIcon name={icon} />
            </span>
            <span className="rail-action__label">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default function FeedExperience({ children }: { children: ReactNode }) {
  const feedRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const feedElement = feedRef.current;
    if (feedElement === null) return;

    const panels = Array.from(feedElement.querySelectorAll<HTMLElement>("[data-feed-panel]"));
    // The most-visible snap panel drives both the action labels and ambient color drift.
    const observer = new IntersectionObserver(
      (entries) => {
        const visiblePanels = entries.filter((entry) => entry.isIntersecting);
        visiblePanels.forEach((entry) => {
          (entry.target as HTMLElement).dataset.entered = "true";
        });
        const mostVisible = visiblePanels.sort(
          (first, second) => second.intersectionRatio - first.intersectionRatio,
        )[0];
        if (!mostVisible) return;

        const nextIndex = panels.indexOf(mostVisible.target as HTMLElement);
        panels.forEach((panel, index) => {
          panel.dataset.active = String(index === nextIndex);
        });
        setActivePanel(nextIndex);
      },
      { root: feedElement, threshold: [0.35, 0.6, 0.8] },
    );

    panels.forEach((panel) => observer.observe(panel));

    function updateProgress(element: HTMLElement) {
      frameRef.current = null;
      const scrollableHeight = element.scrollHeight - element.clientHeight;
      setProgress(scrollableHeight > 0 ? element.scrollTop / scrollableHeight : 0);
    }

    function handleScroll() {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          const element = feedRef.current;
          if (element !== null) updateProgress(element);
        });
      }
    }

    feedElement.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(feedElement);

    return () => {
      observer.disconnect();
      feedElement.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const drift = [
    { cyan: [0, 58], pink: [0, -42] },
    { cyan: [-46, -20], pink: [64, 30] },
    { cyan: [60, 28], pink: [-42, -52] },
    { cyan: [-32, 58], pink: [46, -22] },
    { cyan: [22, -44], pink: [-58, 40] },
  ][activePanel] ?? { cyan: [0, 0], pink: [0, 0] };

  return (
    <div className="feed-experience">
      <div className="feed-ambient" aria-hidden="true">
        <motion.div
          className="feed-glow feed-glow--cyan"
          animate={{ x: drift.cyan[0], y: drift.cyan[1], scale: 1 + activePanel * 0.025 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
        />
        <motion.div
          className="feed-glow feed-glow--pink"
          animate={{ x: drift.pink[0], y: drift.pink[1], scale: 1 + activePanel * 0.02 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        />
      </div>
      <div
        className="feed-progress"
        role="progressbar"
        aria-label="Story progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <main className="feed-scroll" ref={feedRef}>
        {children}
      </main>
      <ActionRail activePanel={activePanel} />
    </div>
  );
}
