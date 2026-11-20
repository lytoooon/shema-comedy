const escapeHtml = (text) =>
  text.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );

/** Turns `*words*` into `<em>words</em>` (safely escaped), for use with `set:html`. */
export const emphasize = (text) => escapeHtml(text).replace(/\*(.+?)\*/g, "<em>$1</em>");

/** 1 → "01" */
export const pad = (n) => String(n).padStart(2, "0");
