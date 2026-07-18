"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { stats, projects } from "@/lib/data";
import { thumbnailFor } from "@/lib/thumbnail";
import GlitchGallery from "@/components/GlitchGallery";

const title = "KUNAL BANSAL";

const gallerySlides = projects.map((p) => ({
  src: thumbnailFor(p),
  label: p.title,
  category: p.category,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[82vh] items-start overflow-hidden bg-black px-6 pt-32 pb-16 sm:px-10 sm:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 30%), rgba(220,38,38,0.14), transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-neutral-300 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Film Director — 10+ Years
          </motion.div>

          <h1 className="font-display flex flex-wrap text-[14vw] leading-[0.85] tracking-tight sm:text-[7vw] lg:text-[5.2vw]">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 + 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                className={
                  char === " "
                    ? "inline-block w-[3vw] sm:w-[1.5vw] lg:w-[1vw]"
                    : `inline-block ${
                        i > 5
                          ? "text-transparent [-webkit-text-stroke:1.5px_white] sm:[-webkit-text-stroke:2px_white]"
                          : ""
                      }`
                }
              >
                {char === " " ? "" : char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg text-neutral-300 sm:text-xl"
          >
            Crafting advertisements, fiction, corporate films and documentaries
            that have collectively earned <span className="text-white">150 million+ views</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-white sm:text-3xl">{stat.value}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlitchGallery slides={gallerySlides} />
        </motion.div>
      </div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5 group-hover:border-white/50"
        >
          <span className="h-1.5 w-1 rounded-full bg-current" />
        </motion.span>
      </motion.a>
    </section>
  );
}
