# Shema Comedy

Single-page portfolio for Shema, a lifestyle & comedy creator from Lusaka. Built with
[Astro](https://astro.build) (static output), [GSAP](https://gsap.com) + ScrollTrigger + SplitText,
and [Lenis](https://lenis.darkroom.engineering) smooth scrolling.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321/shema-comedy/
npm run build    # outputs to dist/ (photos are resized + converted to WebP here)
npm run preview  # serve the built site locally
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). The site is
served from `/shema-comedy/`, set by `base` in `astro.config.mjs`.

## Editing the site

You'll rarely need to touch anything outside `src/data/`.

| To change                                         | Edit                                      |
| ------------------------------------------------- | ----------------------------------------- |
| Name, phone/WhatsApp, email, socials, menu, SEO   | `src/data/site.js`                        |
| Any text or photo on the page                     | `src/data/content.js`                     |
| Photos                                            | drop files in `src/assets/photos/`        |
| Partner logos                                     | drop files in `src/assets/logos/`         |
| Colours, fonts, sizes, spacing                    | `src/styles/tokens.css`                   |
| Animation feel (scroll speed, reveals, ink, etc.) | `src/scripts/config.js`                   |
| Section order                                     | `src/pages/index.astro`                   |
| Layout/styles of one section                      | `src/components/sections/<Section>.astro` |
| Link-preview image (WhatsApp, X, Facebook)        | `public/og-image.jpg` (1200×630)          |

Handy conventions in `content.js`:

- Photos are referenced by file name (`"c1.jpg"`). Any size works; they're optimized at build time.
- Wrap words in `*asterisks*` to highlight them in red (or with a marker swipe in About).
- Section numbers (`01 /`, `02 /`…) are automatic, so you can reorder or remove sections freely.
- **The Reach stats are placeholders (`00K`)**. Swap in real numbers like `"120K"`; they count up on scroll.

## How it's put together

```
src/
  data/           site.js (identity + contact), content.js (all copy + photos)
  assets/         photos/ and logos/ (optimized by Astro)
  components/     Header, Footer, ui/ (Photo, Marquee, SectionHead, Icon), sections/ (one per section)
  styles/         tokens.css, base.css, components.css (buttons, kicker…), motion.css
  scripts/
    main.js       switches every feature on, in order
    config.js     motion tuning
    core/         GSAP setup, Lenis smooth scroll, shared scroll velocity
    features/     one file per effect (hero, story-feed, stage, marquee, reveal, menu…)
    fluid/        WebGL marbled-ink background
```

Every animation respects the visitor's **reduced motion** setting: content stays fully visible, the
galleries become a plain grid / swipeable row, and smooth scrolling is off. Without JavaScript the
page still reads and works completely.
