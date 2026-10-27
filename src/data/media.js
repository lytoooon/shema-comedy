// Images live in public/assets. Use file names only.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const asset = (file) => `${base}/assets/${file}`;

export const heroPhoto = asset("shema-portrait.png");

export const aboutPhotos = ["life1.jpg", "life2.jpg", "life3.png", "life4.jpg"].map(asset);

// Each gallery shows its first four items.
export const campaignMedia = [
  { src: asset("1.jpeg"), caption: "My everyday style" },
  { src: asset("2.jpeg"), caption: "Life and the people around me" },
  { src: asset("3.jpeg"), caption: "A little comedy, a lot of character" },
  { src: asset("4.jpeg"), caption: "My off-duty look" },
];

export const momentsMedia = [
  { src: asset("life1.jpeg"), caption: "Out and about" },
  { src: asset("life2.jpeg"), caption: "A moment from my day" },
  { src: asset("life3.jpeg"), caption: "My everyday style" },
  { src: asset("life4.jpeg"), caption: "Comedy in the little things" },
];

// Either `icon` (a drawn shape from partnerShapes) or `iconUrl`.
export const partners = [
  { label: "MWOS BET", icon: "dice" },
  { label: "TECNO", iconUrl: asset("tecno-favicon.png") },
  { label: "Apple", iconUrl: asset("apple-favicon.png") },
];

export const partnerShapes = {
  dice: '<rect x="5" y="5" width="38" height="38" rx="10"/><circle cx="15" cy="15" r="3" fill="#F5F5F5"/><circle cx="24" cy="24" r="3" fill="#F5F5F5"/><circle cx="33" cy="33" r="3" fill="#F5F5F5"/>',
  phone:
    '<rect x="12" y="3" width="24" height="42" rx="4"/><rect x="15" y="8" width="18" height="29" rx="1" fill="#F5F5F5"/><circle cx="24" cy="41" r="1.5" fill="#F5F5F5"/>',
  spark:
    '<path d="M24 2 29 18 46 24 29 29 24 46 18 29 2 24 18 18Z"/><circle cx="39" cy="9" r="4"/><circle cx="9" cy="39" r="3"/>',
};
