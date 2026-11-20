// Looks up images in src/assets by file name, so content.js can stay plain text.
// Astro optimizes whatever this returns (resizing + WebP) at build time.

const files = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,avif}", { eager: true, import: "default" });

const byName = Object.fromEntries(
  Object.entries(files).map(([path, image]) => [path.split("/").pop(), image]),
);

/** @param {string} name e.g. "c1.jpg" */
export function image(name) {
  const found = byName[name];
  if (!found) {
    throw new Error(
      `Image "${name}" was not found in src/assets/. Available: ${Object.keys(byName).join(", ")}`,
    );
  }
  return found;
}
