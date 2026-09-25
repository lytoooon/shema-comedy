"use client";

import { motion } from "framer-motion";

const moments = [
  {
    date: "The name behind the page",
    title: "Arnold Shema Rukhina",
  },
  {
    date: "At the University of Zambia",
    title: "Mining engineering student",
  },
  {
    date: "Birthday",
    title: "September 20 · 21 years old",
  },
];

export default function PersonalLife() {
  return (
    <section className="life-section section-pad" id="life" aria-labelledby="life-title">
      <div className="life-heading">
        <div>
          <p className="eyebrow">Comedy is one part of the story</p>
          <h2 id="life-title">
            Meet the
            <br />
            <span>real Shema.</span>
          </h2>
        </div>
        <p className="section-aside">
          A creator, student, and comedian
          <br className="desktop-break" /> balancing lectures and laughs.
        </p>
      </div>
      <div className="life-timeline">
        {moments.map((moment, index) => (
          <motion.article
            className={`life-card life-card--${index + 1}`}
            key={moment.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
          >
            <span className="life-card__shade" />
            <div className="life-card__caption">
              <p>{moment.date}</p>
              <h3>{moment.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
