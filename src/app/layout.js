import { Cormorant_Garamond, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteChrome from "@/components/SiteChrome";
import { SITE, SITE_URL } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Luxora Glaze System Limited | Engineering Light & Luxury",
  description:
    "Premium aluminium windows, folding doors, glass facades, and architectural glazing systems in Malindi, Kenya.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_KE",
    images: [{ url: "/images/hero/hero1.jpg", alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${bebas.variable}`}
    >
      <body className="bg-black text-text antialiased">
        {children}
        <SiteChrome>
          <Footer />
          <FloatingWhatsApp />
        </SiteChrome>
      </body>
    </html>
  );
}