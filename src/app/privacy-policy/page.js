import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy | Luxora Glaze System Limited",
  description:
    "How Luxora Glaze System Limited collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <JsonLd
        data={[
          webPageLd({ name: metadata.title, description: metadata.description, path: "/privacy-policy" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]),
        ]}
      />
      {/* PAGE HEADER */}
      <div className="relative bg-char px-5 md:px-15 pt-20 md:pt-24 pb-14 md:pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold mb-4">
            <Link href="/" className="text-dim hover:text-gold transition-colors">
              Home
            </Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Privacy <em className="text-gold not-italic">Policy</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        <div className="max-w-160 mx-auto bg-card border border-border p-7 md:p-12 flex flex-col gap-10">
          <p className="text-[13px] text-dim">Last updated: September 2026</p>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">Introduction</h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              Luxora Glaze System Limited (&quot;Luxora,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting the personal information you share with
              us through this website. This policy explains what information
              we collect, how we use it, and the choices you have.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Information We Collect
            </h2>
            <p className="text-[14px] text-silver leading-[1.9] mb-3">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="flex flex-col gap-2 text-[14px] text-silver leading-[1.9] list-disc pl-5">
              <li>
                Submit a Request a Quote form, including your name, company,
                email address, phone number, project details, and any files
                you choose to attach (drawings, photos, or documents).
              </li>
              <li>
                Subscribe to our newsletter, using only your email address.
              </li>
              <li>
                Contact us directly via phone, WhatsApp, or email.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              How We Use Your Information
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              We use the information you provide solely to respond to your
              enquiry, prepare quotations, coordinate site assessments and
              installations, and send newsletter updates to subscribers who
              have opted in. We do not sell, rent, or trade your personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Data Storage
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              Request a Quote submissions, including any attached files, are
              sent directly to our team by email and are not stored on our
              servers. Newsletter subscriptions are managed through a
              third-party email service used solely for sending updates you
              have subscribed to.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Cookies & Analytics
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              This website may use analytics tools to understand how visitors
              use our site, such as which pages are viewed and how visitors
              found us. This helps us improve the website and our services.
              This data is aggregated and is not used to personally identify
              you.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Your Rights
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              You have the right to ask us what personal information we hold
              about you, to request corrections, and to request that your
              information be deleted. To exercise any of these rights, please
              contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Changes to This Policy
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              We may update this policy from time to time. Any changes will
              be posted on this page with a revised &quot;Last updated&quot;
              date.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-gold mb-3">
              Contact Us
            </h2>
            <p className="text-[14px] text-silver leading-[1.9]">
              If you have questions about this Privacy Policy or how your
              information is handled, please{" "}
              <Link href="/contacts" className="text-gold hover:text-gold-lt underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
