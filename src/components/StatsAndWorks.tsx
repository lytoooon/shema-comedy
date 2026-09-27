"use client";

import { motion } from "framer-motion";

const work = [
  {
    number: "01",
    type: "EVERYDAY ZAMBIAN LIFE",
    title: "Life, with a punchline",
    brand: "The comedy",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85",
    className: "work-card--tall",
  },
  {
    number: "02",
    type: "STUDENT STORIES",
    title: "Campus is its own comedy",
    brand: "Student life",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    className: "work-card--wide",
  },
  {
    number: "03",
    type: "SHORT-FORM SKITS",
    title: "A familiar kind of funny",
    brand: "Sketches",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    className: "work-card--portrait",
  },
];

const stats = [
  { value: "21", label: "years young" },
  { value: "20 Sep", label: "birthday" },
  { value: "UNZA", label: "mining engineering" },
];

export default function StatsAndWorks() {
  return (
    <section
      className="works-section section-pad feed-panel"
      id="work"
      data-feed-panel
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">The person behind the punchlines</p>
          <h2 id="work-title">
            Real life makes
            <br />
            <span>good comedy.</span>
          </h2>
        </div>
        <p className="section-aside">
          Short sketches, Zambian moments, and
          <br className="desktop-break" /> a little campus-life chaos.
        </p>
      </div>

      <div className="stats-row" aria-label="About Arnold Shema Rukhina">
        {stats.map((stat, index) => (
          <motion.div
            className="stat"
            key={stat.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="work-grid">
        {work.map((item, index) => (
          <motion.a
            className={`work-card ${item.className}`}
            href="#contact"
            key={item.number}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            style={{ backgroundImage: `url("${item.image}")` }}
          >
            <span className="work-card__shade" />
            <span className="work-card__top">
              <span>{item.type}</span>
              <span>{item.number}</span>
            </span>
            <span className="work-card__caption">
              <span className="work-card__brand">{item.brand}</span>
              <span className="work-card__title">{item.title}</span>
            </span>
            <span className="work-card__arrow" aria-hidden="true">
              ↗
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
