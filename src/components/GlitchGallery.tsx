"use client";

import { useEffect, useState } from "react";

type Slide = { src: string; label: string; category: string };

export default function GlitchGallery({
  slides,
  interval = 2600,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setGlitching(true);
      setIndex((i) => (i + 1) % slides.length);
      setTimeout(() => setGlitching(false), 350);
    }, interval);
    return () => clearInterval(tick);
  }, [slides.length, interval]);

  const current = slides[index];
  if (!current) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={current.src}
        src={current.src}
        alt={current.label}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {glitching && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt=""
            aria-hidden
            className="glitch-slice-a absolute inset-0 h-full w-full object-contain mix-blend-screen"
            style={{ filter: "saturate(6) hue-rotate(-50deg) brightness(1.3)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt=""
            aria-hidden
            className="glitch-slice-b absolute inset-0 h-full w-full object-contain mix-blend-screen"
            style={{ filter: "saturate(6) hue-rotate(150deg) brightness(1.3)" }}
          />
          <div className="glitch-flash absolute inset-0 bg-white" />
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
        <span className="truncate">{current.label}</span>
        <span className="whitespace-nowrap text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
        {current.category}
      </span>
    </div>
  );
}
