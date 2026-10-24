import { defineConfig } from "astro/config";

// GitHub Pages project site: https://lytoooon.github.io/shema-comedy/
// If you move to a custom domain, delete `base` and set `site` to that domain.
export default defineConfig({
  site: "https://lytoooon.github.io",
  base: "/shema-comedy/",
  compressHTML: true,
  build: { assets: "static" },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "static/app.[hash].js",
          assetFileNames: "static/[name].[hash][extname]",
        },
      },
    },
  },
});
