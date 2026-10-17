"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    // TODO: not yet connected to a real mailing list provider.
    // Once one is chosen (e.g. Mailchimp, Resend Audiences, Brevo),
    // this will POST the email to that service instead of just logging it.
    console.log("Newsletter signup (not yet connected):", email);

    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  }

  // Compact (blog page): just a "Subscribe" link that reveals the email field when tapped
  if (compact) {
    return (
      <div className="text-center">
        {!showForm && status !== "success" && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="bg-black text-white border border-gold/30 px-4 py-2 text-[10px] font-bold tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Subscribe
          </button>
        )}

        {showForm && status !== "success" && (
          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2 max-w-110 mx-auto pt-7 sm:pt-0 sm:pr-10">
            <button
              type="button"
              onClick={() => { setShowForm(false); setEmail(""); }}
              aria-label="Close"
              className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-gold text-base font-bold cursor-pointer transition-colors hover:text-gold-lt sm:top-1/2 sm:-translate-y-1/2"
            >
              ✕
            </button>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 bg-black border border-border text-white px-3 py-2.5 text-xs outline-none transition-colors duration-200 focus:border-gold"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 bg-black text-white border border-gold/30 px-4 py-2.5 text-[10px] leading-none font-bold tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-50 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        {status === "success" && (
          <div className="flex items-center justify-center gap-3">
            <p className="text-[11px] text-gold">Thanks for subscribing!</p>
            <button
              type="button"
              onClick={() => { setStatus("idle"); setShowForm(false); }}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center text-gold text-base font-bold cursor-pointer transition-colors hover:text-gold-lt"
            >
              ✕
            </button>
          </div>
        )}

        {showForm && status !== "success" && (
          <p className="text-dim text-[9px] mt-2">
            By subscribing, you agree to our{" "}
            <Link href="/privacy-policy" className="text-gold hover:text-gold-lt underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-card border border-border text-center ${
        compact ? "px-5 py-5" : "px-6 py-10 md:px-12 md:py-12"
      }`}
    >
      {!compact && (
        <Mail className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1.5} />
      )}
      <h3
        className={`font-serif font-light text-white ${
          compact ? "text-[20px] mb-1.5" : "text-[24px] md:text-[28px] mb-2"
        }`}
      >
        Stay in the <em className="text-gold not-italic">Loop</em>
      </h3>
      <p
        className={`text-silver max-w-100 mx-auto ${
          compact
            ? "text-[12px] mb-3 leading-[1.6]"
            : "text-[13px] mb-6 leading-[1.8]"
        }`}
      >
        Subscribe for project updates, product launches, and glazing
        insights from Luxora.
      </p>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col mx-auto ${
          compact ? "gap-2" : "gap-3 sm:flex-row max-w-110"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`flex-1 bg-black border border-border text-white px-4 text-sm outline-none transition-colors duration-200 focus:border-gold ${
            compact ? "py-2" : "py-3"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`bg-gold text-black px-6 text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-gold-lt disabled:opacity-50 whitespace-nowrap ${
            compact ? "py-2" : "py-3"
          }`}
        >
          Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="text-[13px] text-gold mt-4">
          Thanks for subscribing!
        </p>
      )}

      <p className={`text-dim ${compact ? "text-[10px] mt-2.5" : "text-[11px] mt-4"}`}>
        By subscribing, you agree to our{" "}
        <Link href="/privacy-policy" className="text-gold hover:text-gold-lt underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}