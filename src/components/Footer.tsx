export default function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-main page-gutter">
        <div>
          <p className="eyebrow">Have a good one in mind?</p>
          <h2>
            Let&apos;s create
            <br />
            <span>something.</span>
          </h2>
        </div>
        <div className="footer-contact">
          <a className="footer-email" href="mailto:hello@marcuscole.studio">
            hello@marcuscole.studio <span aria-hidden="true">↗</span>
          </a>
          <p>For partnerships, projects, and everything in between.</p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              YouTube ↗
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              TikTok ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom page-gutter">
        <a className="brand" href="#hero" aria-label="Back to top">
          MC<span>.</span>
        </a>
        <span>Independent by nature. Collaborative by choice.</span>
        <span>© {new Date().getFullYear()} Marcus Cole</span>
      </div>
    </footer>
  );
}
