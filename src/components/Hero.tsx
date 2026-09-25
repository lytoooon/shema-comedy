export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85"
        aria-hidden="true"
      >
        <source
          src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero__veil" />
      <div className="hero__content page-gutter">
        <p className="eyebrow hero__eyebrow">
          <span className="live-dot" />
          Zambian comedian · Creator · UNZA student
        </p>
        <h1 id="hero-title">
          SHEMA
          <br />
          <span>COMEDY</span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__intro">
            Arnold Shema Rukhina
            <br />
            Mining engineering student by day.
          </p>
          <a className="text-link" href="#collaborations">
            Find the funny <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>
      <p className="hero__index" aria-hidden="true">
        LUSAKA · ZAMBIA
      </p>
      <a className="hero__scroll" href="#work" aria-label="Scroll to Shema Comedy">
        <span />
      </a>
    </section>
  );
}
