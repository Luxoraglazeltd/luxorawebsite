"use client";

import { useState } from "react";
import { Download, X, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function DownloadConfirm({ title, fileUrl }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("confirm"); // confirm | loading | success | error

  function openDialog() {
    setStatus("confirm");
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function handleConfirm() {
    setStatus("loading");
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const match = /filename="?([^"]+)"?/i.exec(res.headers.get("Content-Disposition") || "");
      const fileName = match ? match[1] : "luxora-document.pdf";

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt"
      >
        <Download className="w-3.5 h-3.5" strokeWidth={2} />
        Download PDF
      </button>

      {open && (
        <div
          className="fixed inset-0 z-300 bg-black/90 flex items-center justify-center p-4"
          onClick={closeDialog}
        >
          <div
            className="bg-card border border-gold/30 max-w-sm w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDialog}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-200"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {status === "confirm" && (
              <>
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-5">
                  <FileText className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[20px] text-white mb-2">
                  Download this document?
                </h3>
                <p className="text-[13px] text-silver leading-[1.8] mb-7">{title}</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirm}
                    className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase px-6 py-3 flex-1 transition-all duration-300 hover:bg-gold-lt"
                  >
                    Yes, Download
                  </button>
                  <button
                    onClick={closeDialog}
                    className="bg-transparent text-white border border-white/25 text-[10px] font-medium tracking-[2px] uppercase px-6 py-3 flex-1 transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {status === "loading" && (
              <div role="status" aria-live="polite">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-5">
                  <span className="block w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
                <h3 className="font-serif text-[20px] text-white mb-2">
                  Preparing your download…
                </h3>
                <p className="text-[13px] text-silver leading-[1.8]">
                  {title}
                  <br />
                  This may take a few seconds. Please keep this page open.
                </p>
              </div>
            )}

            {status === "success" && (
              <div role="status" aria-live="polite">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[20px] text-white mb-2">
                  Download complete
                </h3>
                <p className="text-[13px] text-silver leading-[1.8] mb-7">
                  {title} has been downloaded to your device.
                </p>
                <button
                  onClick={closeDialog}
                  className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase px-6 py-3 w-full transition-all duration-300 hover:bg-gold-lt"
                >
                  Done
                </button>
              </div>
            )}

            {status === "error" && (
              <div role="alert">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-5">
                  <AlertCircle className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[20px] text-white mb-2">
                  Download didn&apos;t complete
                </h3>
                <p className="text-[13px] text-silver leading-[1.8] mb-7">
                  Something went wrong while preparing {title}. Please try again.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirm}
                    className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase px-6 py-3 flex-1 transition-all duration-300 hover:bg-gold-lt"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={closeDialog}
                    className="bg-transparent text-white border border-white/25 text-[10px] font-medium tracking-[2px] uppercase px-6 py-3 flex-1 transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
