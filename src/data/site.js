// Identity and contact details: used in the header, contact section, footer and SEO tags.

export const site = {
  name: "Shema",
  brand: "Shema Comedy",
  title: "Shema Comedy — Lifestyle & comedy creator from Lusaka, Zambia",
  description:
    "I’m Shema, a 21-year-old University of Zambia mining engineering student and lifestyle and comedy content creator from Lusaka.",
  location: "Lusaka, Zambia",
  timeZone: "Africa/Lusaka", // used by the live clock in the footer

  // Contact. `whatsapp` is the same number as digits only (country code, no +).
  phone: "+260 777 320 048",
  whatsapp: "260777320048",
  email: "", // optional — fill in to show an email link in the contact section

  // Image shown when the site is shared on WhatsApp, X, Facebook… (file in /public)
  shareImage: "og-image.jpg",

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { label: "TikTok", handle: "@shema_comedy", url: "https://www.tiktok.com/@shema_comedy" },
    {
      label: "Facebook",
      handle: "Shema Comedy",
      url: "https://www.facebook.com/profile.php?id=100085322169806",
    },
  ],
};

/** WhatsApp chat link, optionally with a pre-filled message. */
export const whatsappLink = (message = "") =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/** `tel:` link for the phone number (spaces removed). */
export const phoneLink = `tel:${site.phone.replace(/\s+/g, "")}`;
