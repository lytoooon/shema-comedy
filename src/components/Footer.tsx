export default function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-main page-gutter">
        <div>
          <p className="eyebrow">Catch the next sketch</p>
          <h2>
            Keep the
            <br />
            <span>laughs going.</span>
          </h2>
        </div>
        <div className="footer-contact">
          <a
            className="footer-email"
            href="https://www.tiktok.com/@shema_comedy"
            target="_blank"
            rel="noreferrer"
          >
            TikTok · @shema_comedy <span aria-hidden="true">↗</span>
          </a>
          <p>Follow Shema Comedy for skits, student stories, and Zambian humor.</p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.facebook.com/search/top?q=shema%20comedy" target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
            <a href="https://www.tiktok.com/@shema_comedy" target="_blank" rel="noreferrer">
              TikTok ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom page-gutter">
        <a className="brand" href="#hero" aria-label="Back to top">
          SC<span>.</span>
        </a>
        <span>Comedy from everyday Zambian life.</span>
        <span>© {new Date().getFullYear()} Shema Comedy</span>
      </div>
    </footer>
  );
}
