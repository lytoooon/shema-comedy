"use client";

import { motion } from "framer-motion";

const moments = [
  {
    date: "Somewhere in the Dolomites",
    title: "A slower kind of morning",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85",
  },
  {
    date: "On set, northern California",
    title: "Between the takes",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
  },
  {
    date: "Home, after the rain",
    title: "The good in-between",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function PersonalLife() {
  return (
    <section className="life-section section-pad" id="life" aria-labelledby="life-title">
      <div className="life-heading">
        <div>
          <p className="eyebrow">Off the clock, into the moment</p>
          <h2 id="life-title">
            Life between
            <br />
            <span>the lines.</span>
          </h2>
        </div>
        <p className="section-aside">
          The best stories don&apos;t always
          <br className="desktop-break" /> happen on set.
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
            style={{ backgroundImage: `url("${moment.image}")` }}
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
