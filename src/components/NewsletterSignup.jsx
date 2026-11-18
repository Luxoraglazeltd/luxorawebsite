"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function NewsletterSignup({ compact: collapsible = false }) {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  // The sign-up is emailed to the sales inbox by /api/newsletter
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: new FormData(e.target).get("website"), // hidden bot trap
        }),
      });
      if (!res.ok) throw new Error("Sign-up failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const botTrap = (
    <input
      name="website"
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
  const errorNote = status === "error" && (
    <p className="text-[11px] text-red-400 mt-2">
      Something went wrong. Please try again.
    </p>
  );

  // Collapsible (blog page): a button that opens the same card as the home page
  if (collapsible && !showForm) {
    return (
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-black text-white border border-gold/30 px-5 py-3 text-[11px] font-bold tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold"
        >
          <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
          Subscribe to our mail list
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative bg-card border border-border text-center px-6 py-10 md:px-12 md:py-12"
    >
      {collapsible && (
        <button
          type="button"
          onClick={() => { setShowForm(false); setStatus("idle"); setEmail(""); }}
          aria-label="Close"
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gold text-base font-bold cursor-pointer transition-colors hover:text-gold-lt"
        >
          ✕
        </button>
      )}
      <Mail className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1.5} />
      <h3
        className="font-serif font-light text-white text-[24px] md:text-[28px] mb-2"
      >
        Stay in the <em className="text-gold not-italic">Loop</em>
      </h3>
      <p
        className="text-silver max-w-100 mx-auto text-[13px] mb-6 leading-[1.8]"
      >
        Subscribe for project updates, product launches, and glazing
        insights from Luxora.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto gap-3 sm:flex-row max-w-110"
      >
        {botTrap}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-black border border-border text-white px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-gold text-black px-6 py-3 text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-gold-lt disabled:opacity-50 whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="text-[13px] text-gold mt-4">
          Thanks for subscribing!
        </p>
      )}
      {errorNote}

      <p className="text-dim text-[11px] mt-4">
        By subscribing, you agree to our{" "}
        <Link href="/privacy-policy" className="text-gold hover:text-gold-lt underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}