"use client";

import { useState } from "react";

const MAX_FILE_MB = 10;

export default function ContactForm() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [siteAssessment, setSiteAssessment] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      setFileError("");
      return;
    }
    if (selected.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File too large. Please upload a file under ${MAX_FILE_MB}MB.`);
      setFile(null);
      e.target.value = "";
      return;
    }
    setFileError("");
    setFile(selected);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      e.target.reset();
      setFile(null);
      setSiteAssessment(false);
    } catch (err) {
      setStatus("error");
    }
  }

  const inputClass =
    "bg-card border border-border text-white px-4 py-3.25 text-sm outline-none transition-colors duration-200 focus:border-gold w-full";
  const labelClass = "text-[10px] text-dim tracking-[1.5px] uppercase";

  return (
    <div className="bg-black p-6 md:p-15">
      <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-7">
        <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
        Request a Quote
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* CONTACT DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Full Name</label>
            <input name="fullName" type="text" required placeholder="Your full name" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Company / Organisation</label>
            <input name="company" type="text" placeholder="Your company name" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email Address</label>
            <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Phone / WhatsApp</label>
            <input name="phone" type="tel" placeholder="+254 700 000 000" className={inputClass} />
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <div className="mt-2 mb-1 text-[10px] font-semibold tracking-[3px] uppercase text-gold">
          Project Details
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Project Name</label>
            <input name="projectName" type="text" placeholder="e.g. Riverside Villa" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Project Location</label>
            <input name="projectLocation" type="text" placeholder="e.g. Malindi, Kenya" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Project Type</label>
            <select name="projectType" className={inputClass + " cursor-pointer"}>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Hospitality</option>
              <option>Renovation</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Project Stage</label>
            <select name="projectStage" className={inputClass + " cursor-pointer"}>
              <option>Just Exploring / Planning</option>
              <option>Design Stage</option>
              <option>Ready to Build</option>
              <option>Under Construction</option>
              <option>Renovation In Progress</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Products / Systems Required</label>
          <input
            name="productsRequired"
            type="text"
            placeholder="e.g. Windows, folding doors, glass"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Approx. Quantities / Dimensions</label>
            <input
              name="quantitiesDimensions"
              type="text"
              placeholder="e.g. 6 windows, approx 1.2m x 1.5m each"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Glass Preference</label>
            <input
              name="glassPreference"
              type="text"
              placeholder="e.g. Clear, tinted, Low-E (if known)"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Colour / Finish Preference</label>
          <input
            name="colourFinish"
            type="text"
            placeholder="e.g. Matte black, natural aluminium (if known)"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Subject</label>
          <select name="subject" className={inputClass + " cursor-pointer"}>
            <option>Request a Quote</option>
            <option>Product Enquiry</option>
            <option>Technical Support</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Additional Project Requirements</label>
          <textarea
            name="message"
            required
            placeholder="Tell us anything else about your project..."
            className={inputClass + " h-[120px] resize-none"}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            Attach Drawings, Photos, or Documents (optional, max {MAX_FILE_MB}MB)
          </label>
          <input
            name="attachment"
            type="file"
            onChange={handleFileChange}
            className="bg-card border border-border text-silver text-sm px-4 py-3 w-full file:mr-4 file:py-1.5 file:px-3 file:border-0 file:text-[11px] file:uppercase file:tracking-wide file:bg-gold file:text-black file:cursor-pointer cursor-pointer"
          />
          {fileError && <span className="text-[12px] text-red-400 mt-1">{fileError}</span>}
          {file && !fileError && (
            <span className="text-[12px] text-gold mt-1">{file.name} ready to send</span>
          )}
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer py-1">
          <input
            type="checkbox"
            name="siteAssessment"
            checked={siteAssessment}
            onChange={(e) => setSiteAssessment(e.target.checked)}
            className="w-4 h-4 accent-gold cursor-pointer"
          />
          <span className="text-[13px] text-silver">
            I would like to request an on-site assessment
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-gold text-black w-full py-4 text-[11px] font-bold tracking-[2px] uppercase mt-2 transition-all duration-300 hover:bg-gold-lt disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Send Request"}
        </button>

        {status === "success" && (
          <p className="text-[13px] text-green-400 text-center mt-2">
            Request sent successfully. We&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-[13px] text-red-400 text-center mt-2">
            Something went wrong. Please try again or WhatsApp us directly.
          </p>
        )}
      </form>
    </div>
  );
}
