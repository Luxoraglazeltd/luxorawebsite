// Single source of truth for business facts used in SEO / structured data.
// Every value here is copied from what the website already shows (Footer, Contacts, About).
// If a detail changes on the site, change it here too.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.luxoraglazesystemltd.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Luxora Glaze System Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo.png`,
  image: `${SITE_URL}/images/hero/hero1.jpg`,
  description:
    "Luxora Glaze System Limited is a premium architectural glazing and building-envelope company serving residential, commercial, hospitality, and architectural projects across Kenya and East Africa.",
  telephone: "+254799928056",
  whatsapp: "https://wa.me/254799928056",
  emails: ["info@luxoraglazesystemltd.com", "sales@luxoraglazesystemltd.com"],
  address: {
    streetAddress: "Along Malindi-Mombasa Road, Malindi Mall",
    addressLocality: "Malindi",
    addressCountry: "KE",
  },
  // From the Contacts page: Monday – Saturday, 8:00 AM – 6:00 PM EAT
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  // From the FAQ: Malindi, Mombasa, the wider Kenyan coast, Nairobi, and East Africa
  areaServed: ["Malindi", "Mombasa", "Nairobi", "Kenya", "East Africa"],
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
