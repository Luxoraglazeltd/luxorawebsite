import { SITE, SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

// The business itself. Used on the home page; other pages point back to it by @id.
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE_URL,
    logo: SITE.logo,
    image: SITE.image,
    description: SITE.description,
    sameAs: Object.values(SITE.socials),
    telephone: SITE.telephone,
    email: SITE.emails[0],
    address: { "@type": "PostalAddress", ...SITE.address },
    areaServed: SITE.areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.telephone,
        email: SITE.emails[0],
        areaServed: "KE",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.emails[1],
        areaServed: "KE",
        availableLanguage: "English",
      },
    ],
    // Names, descriptions and groups come straight from src/data/products.js (what the site displays).
    // Listed as Services, not Product: no prices or reviews are published, and Google requires
    // "offers", "review" or "aggregateRating" on every Product.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Luxora Glazing Products and Services",
      itemListElement: CATEGORIES.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.label,
        itemListElement: PRODUCTS.filter((p) => p.category === cat.id).map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.name, description: p.desc },
        })),
      })),
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE_URL,
    inLanguage: "en-KE",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

// items: [{ name, path }] in the same order as the visible breadcrumb on the page.
export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageLd({ type = "WebPage", name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en-KE",
  };
}

export function faqLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
