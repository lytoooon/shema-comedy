"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Collaborations", href: "#collaborations" },
  { label: "Life", href: "#life" },
];

export default function NavBar() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 14, mass: 0.2 });

  function moveButton(event: React.PointerEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  }

  function resetButton() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="Marcus Cole home">
        MC<span>.</span>
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <motion.a
        className="nav-cta"
        href="#contact"
        style={{ x, y }}
        onPointerMove={moveButton}
        onPointerLeave={resetButton}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </motion.a>
    </header>
  );
}
