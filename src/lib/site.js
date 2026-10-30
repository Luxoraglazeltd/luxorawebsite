// Single source of truth for business facts used in SEO / structured data.
// Every value here is copied from what the website already shows (Footer, Contacts, About).
// If a detail changes on the site, change it here too.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.luxoraglazesystem.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Luxora Glaze System Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo.png`,
  image: `${SITE_URL}/images/hero/hero1.jpg`,
  description:
    "Luxora Glaze System Limited is a premium architectural glazing and building-envelope company based in Malindi, Kilifi County, Kenya. It supplies and installs aluminium and uPVC windows and doors, architectural glass, shower enclosures, skylights and garage doors for residential, commercial and hospitality projects across Kenya and East Africa.",
  telephone: "+254799928056",
  whatsapp: "https://wa.me/254799928056",
  // Social pages. Add the other networks here as the client creates them.
  socials: {
    facebook: "https://www.facebook.com/people/Luxora-Glaze-System-Limited/61595258996964/",
    instagram: "https://www.instagram.com/luxoraglazesystem_limited",
  },
  emails: ["info@luxoraglazesystem.com", "sales@luxoraglazesystem.com"],
  address: {
    streetAddress: "Along Malindi-Mombasa Road",
    postOfficeBoxNumber: "220",
    postalCode: "80108",
    addressLocality: "Malindi",
    addressRegion: "Kilifi County",
    addressCountry: "KE",
  },
  // From the Contacts page: Monday to Saturday, 8:00 AM to 6:00 PM EAT
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
