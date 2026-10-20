# Shema Comedy

The portfolio is a standalone static site in `public/portfolio`. It uses
relative asset URLs, so the same files work from the project site path on
GitHub Pages and from a local static server.

## GitHub Pages

The GitHub Actions workflow publishes `public/portfolio` whenever it changes
on `main`, and can also be run manually from the Actions tab.

If Pages has not been configured for the repository yet, set **Settings →
Pages → Build and deployment → Source** to **GitHub Actions**. After the
deployment completes, the project site is available at:

https://lytoooon.github.io/shema-comedy/

## Local Next.js starter

The original Next.js starter remains in the repository. Run `npm ci` followed
by `npm run dev` to work on that starter; the deployed portfolio is the
standalone page under `public/portfolio`.
