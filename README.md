# Shema Comedy

Single-page portfolio built with Astro (static output), GSAP + ScrollTrigger and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

Pushing to `main` builds and deploys to GitHub Pages (see `.github/workflows/deploy.yml`).
The site is served from `/shema-comedy/`, set by `base` in `astro.config.mjs`. Dev server: http://localhost:4321/shema-comedy/

## Images

Put the photos in `public/assets/`:
`shema-portrait.png`, `1.jpeg` to `6.jpeg`, `tecno-favicon.png`, `apple-favicon.png`.

## Where things are

| To change                         | Edit                                      |
| --------------------------------- | ----------------------------------------- |
| Name, email, socials, menu links  | `src/data/site.js`                        |
| Photos, gallery captions, brands  | `src/data/media.js`                       |
| Copy for a section                | `src/components/<Section>.astro`          |
| Colours, fonts, spacing           | `src/styles/tokens.css`                   |
| Styles for one section            | `src/styles/<section>.css`                |
| Scroll speed, reveal strength     | `src/scripts/config.js`                   |

Scripts: `smooth-scroll.js` (Lenis), `reveal.js` (scroll reveals), `gallery.js` (pinned galleries),
`about.js`, `partners-depth.js`, `menu.js`, and `fluid/` (WebGL background).
