import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValuesRibbon from "@/components/ValuesRibbon";
import Products from "@/components/Products";
import Installation from "@/components/Installation";
import WhyLuxora from "@/components/WhyLuxora";
import Services from "@/components/Services";
import DownloadCenter from "@/components/DownloadCenter";
import AboutSection from "@/components/AboutSection";
import CtaBanner from "@/components/CtaBanner";
import NewsletterSignup from "@/components/NewsletterSignup";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/jsonld";

// The Download Centre teaser reads from Sanity; re-check at most once a minute
export const revalidate = 60;

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Nav />
      <Hero />
      <ValuesRibbon />
      <Products />
      <Services />
      <Installation />
      <AboutSection />
      <WhyLuxora />
      <DownloadCenter />
      <CtaBanner />
      <div className="px-5 md:px-15 py-16 md:py-20 max-w-160 mx-auto">
        <NewsletterSignup />
      </div>
    </main>
  );
}