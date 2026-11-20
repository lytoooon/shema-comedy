// Every word and photo on the page lives here, section by section, top to bottom.
//
// • Photos: put the file in src/assets/photos/ and use its file name. Images are resized and
//   compressed automatically at build time, so any size straight off the phone is fine.
// • Wrap words in *asterisks* to highlight them (red text, or a marker swipe in About).
// • Section numbers (01, 02…) are added automatically, so reordering sections is safe.

export const hero = {
  eyebrow: ["Lifestyle & comedy creator", "Based in Lusaka, Zambia"],
  titleTop: "Shema", // drawn on a smile-shaped curve
  titleBottom: "Comedy", // outlined, fills with red as you scroll
  portrait: { photo: "shema-portrait.png", alt: "Portrait of Shema" }, // transparent PNG works best
  intro: "Wagwan mi people, it’s your boy Shema. I’m a lifestyle and comedy content creator.",
  cta: { label: "Let’s talk", href: "#contact" },
  badge: "Lifestyle ✶ Comedy ✶ Lusaka ✶ ",
};

// The red and black bands that cross under the hero.
export const ticker = [
  "Brand skits",
  "Live hosting",
  "Ambassador deals",
  "Appearances",
  "Lifestyle",
  "Comedy",
];

export const reach = {
  kicker: "Reach",
  title: "Every story starts with *real life.*",
  note: "I’m building an audience that keeps growing with every story I share.",
  // TODO: swap the placeholders for real numbers, e.g. "120K", "2.4M", "11%". They count up on scroll.
  stats: [
    { value: "00K", label: "People following me" },
    { value: "00M", label: "Views each month" },
    { value: "00%", label: "Engagement with my content" },
  ],
};

export const about = {
  kicker: "About me",
  statement:
    "I’m 21, studying Mining Engineering at the University of Zambia. I make *lifestyle and comedy content* from the things I see and live every day.",
  body: "I’m Shema, a creator from Lusaka. I share everyday stories that make people laugh and give brands a genuine way to connect with my audience.",
  cta: { label: "Work with me", href: "#contact" },
  // Polaroids that fan out as you scroll (first one sits on top).
  photos: [
    {
      photo: "6.jpeg",
      caption: "camera shy? never",
      alt: "Shema in a white tee against a brick wall, a hand over one eye",
    },
    { photo: "4.jpeg", caption: "kerbside thinking", alt: "Shema sitting on a city kerb outside a café" },
    {
      photo: "3.jpeg",
      caption: "late night",
      alt: "Black-and-white close-up of Shema in a cap, a hand raised to the lens",
    },
    {
      photo: "5.jpeg",
      caption: "on the move",
      alt: "Shema in a hoodie crouched by an open car door at night",
    },
  ],
};

// Pinned "story feed": each scroll swipes in the next post.
export const work = {
  kicker: "Campaign work",
  title: "Then they hit *play.*",
  note: "I make brand stories entertaining, relatable, and worth remembering.",
  handle: "@shema_comedy",
  items: [
    { photo: "c1.jpg", caption: "My everyday style", alt: "Shema in a barber’s cape getting a fresh cut" },
    {
      photo: "c2.jpg",
      caption: "Life and the people around me",
      alt: "Shema in a hi-vis vest posing with a friend under purple club lights",
    },
    {
      photo: "c3.jpg",
      caption: "A little comedy, a lot of character",
      alt: "Shema grinning in a selfie with a friend in sunglasses and a beanie",
    },
    {
      photo: "c4.jpg",
      caption: "My off-duty look",
      alt: "Shema and a friend in a plaid shirt outside the Confucius Institute",
    },
  ],
};

// Dark "on stage" section: each line lights up as you scroll. The last line is red.
export const results = {
  kicker: "The result",
  lines: ["I make them laugh.", "They click.", "They buy."],
  note: "I use a good story to turn attention into a genuine connection with a brand.",
};

// Each service opens WhatsApp with a ready-made message.
export const services = {
  kicker: "Partnerships",
  title: "Ways we can work *together.*",
  items: [
    { title: "Brand skits", text: "Short, funny sketches that put your product at the centre of the story." },
    { title: "Live hosting", text: "Energy on the mic for launches, campus events and brand nights." },
    {
      title: "Ambassador deals",
      text: "A longer partnership where your brand becomes part of my everyday content.",
    },
    { title: "Appearances", text: "I show up in person to meet the audience and bring the vibe." },
  ],
};

// Horizontal pinned strip.
export const moments = {
  kicker: "Out there",
  title: "Moments from *my life.*",
  note: "A few places, people, and everyday moments I’ve shared along the way.",
  backdrop: "Out there", // giant outlined words drifting behind the photos
  items: [
    {
      photo: "life1.jpg",
      caption: "Out and about",
      alt: "Shema with a friend outside a restaurant at night",
    },
    {
      photo: "life2.jpg",
      caption: "A moment from my day",
      alt: "Shema and a friend in a striped tee giving a thumbs up on campus",
    },
    {
      photo: "life3.png",
      caption: "My everyday style",
      alt: "Shema smiling in a classroom selfie with friends behind",
    },
    {
      photo: "life4.jpg",
      caption: "Comedy in the little things",
      alt: "Shema and a friend standing on a dirt road on a sunny day",
    },
  ],
};

// Logos: a file in src/assets/logos/, or `icon: "dice"` for a drawn shape (see Partners.astro).
export const partners = {
  kicker: "Past partnerships",
  title: "Good company *I’ve kept.*",
  note: "I’m proud to have created alongside these brands.",
  brands: [
    { name: "MWOS BET", icon: "dice" },
    { name: "TECNO", logo: "tecno.png" },
    { name: "Apple", logo: "apple.png" },
  ],
};

export const contact = {
  kicker: "Your move",
  title: "Your brand. *My audience.*",
  invite: "Have a brief or a good idea? Let’s make something people want to watch.",
  primary: { label: "Chat on WhatsApp", message: "Hi Shema! I’d like to talk about working together." },
  bookings: ["Brand deals", "Live shows", "Appearances"], // each opens WhatsApp about that topic
};

export const footer = {
  tagline: "Multi-talented youth.",
};
