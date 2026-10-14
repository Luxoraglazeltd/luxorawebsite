"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Pulls the video ID out of any normal YouTube link
function getVideoId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function YouTubeEmbed({ url, title = "Luxora video" }) {
  const [playing, setPlaying] = useState(false);
  const id = getVideoId(url);

  // No link, or not a valid YouTube link: show nothing
  if (!id) return null;

  return (
    <div className="my-10">
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 md:w-20 md:h-20 bg-gold text-black flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-lt">
                <Play className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          </button>
        )}
      </div>

      <a
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-[10px] font-semibold tracking-[2px] uppercase text-gold hover:text-gold-lt transition-colors duration-200"
      >
        Watch on YouTube →
      </a>
    </div>
  );
}
