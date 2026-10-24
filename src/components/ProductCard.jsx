"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const AUTOPLAY_INTERVAL = 7500; // ms between auto-advances
const PAUSE_DURATION = 6000; // ms to stay paused after manual interaction

export default function ProductCard({ product }) {
  const { slug, name, desc, imgCount: plannedCount } = product;
  const allImages = Array.from({ length: plannedCount }, (_, i) => `/images/products/${slug}/product${i + 1}.jpg`);
  // Only pictures that really exist are shown, so a not-yet-uploaded file never gives a blank slide
  const [missing, setMissing] = useState([]);
  const [ratio, setRatio] = useState(null); // width / height of the first picture
  const images = allImages.filter((src) => !missing.includes(src));
  const imgCount = images.length;
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseTimeoutRef = useRef(null);

  const pauseAutoplay = () => {
    setPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setPaused(false), PAUSE_DURATION);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? imgCount - 1 : i - 1));
    pauseAutoplay();
  };

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === imgCount - 1 ? 0 : i + 1));
    pauseAutoplay();
  };

  // Check each picture once: note the ones that fail to load, and the shape of the first
  useEffect(() => {
    allImages.forEach((src, i) => {
      const probe = new Image();
      probe.onload = () => {
        if (i === 0 || (i > 0 && ratio === null)) setRatio((r) => r ?? probe.naturalWidth / probe.naturalHeight);
      };
      probe.onerror = () => setMissing((m) => (m.includes(src) ? m : [...m, src]));
      probe.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, plannedCount]);

  // Autoplay: advances automatically unless paused or the lightbox is open
  useEffect(() => {
    if (imgCount <= 1) return;

    const interval = setInterval(() => {
      if (!paused && !lightboxOpen) {
        setIndex((i) => (i === imgCount - 1 ? 0 : i + 1));
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [imgCount, paused, lightboxOpen]);

  // Clean up pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const safeIndex = imgCount === 0 ? 0 : Math.min(index, imgCount - 1);
  const currentImage = images[safeIndex];

  // Every card keeps the same frame size. Tall (portrait) pictures are shown whole inside it,
  // with a soft blurred copy of the picture filling the sides, instead of making the card taller.
  const isPortrait = ratio !== null && ratio < 1;

  return (
    <div
      id={`product-${slug}`}
      className="group bg-card relative overflow-hidden scroll-mt-24 md:scroll-mt-32 transition-colors duration-300 hover:bg-[#202020]"
    >
      {/* gold hover underline */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100 z-10" />

      {/* IMAGE CAROUSEL */}
      <div
        className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden bg-black cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1800 ease-in-out ${
              i === safeIndex ? "opacity-100 prod-pan" : "opacity-0"
            }`}
          >
            {isPortrait && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-40"
                style={{ backgroundImage: `url('${src}')` }}
              />
            )}
            <div
              className={`absolute inset-0 bg-center bg-no-repeat ${isPortrait ? "bg-contain" : "bg-cover"}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          </div>
        ))}

        {imgCount > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 bg-black/60 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors duration-200 z-20"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 bg-black/60 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors duration-200 z-20"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {Array.from({ length: imgCount }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    i === safeIndex ? "bg-gold" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* INFO */}
      <div className="p-6 md:p-7">
        <h3 className="font-serif text-[22px] font-normal text-white mb-2.5">
          {name}
        </h3>
        <p className="text-[13px] text-silver leading-[1.8] mb-6">{desc}</p>

        <a
          href="/contacts"
          className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt"
        >
          Request a Quote
        </a>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-200 z-10"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <img
            src={currentImage}
            alt={name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {imgCount > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
