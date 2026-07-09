"use client";

import { motion } from "framer-motion";

const title = "KUNAL BANSAL";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-32 pb-10 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-sm uppercase tracking-[0.4em] text-neutral-400"
        >
          Film Director — 10+ Years
        </motion.p>

        <h1 className="font-display flex flex-wrap text-[15vw] leading-[0.85] tracking-tight sm:text-[9vw]">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-8 max-w-xl text-lg text-neutral-300 sm:text-xl"
        >
          Crafting advertisements, fiction, corporate films and documentaries
          that have collectively earned <span className="text-white">150 million+ views</span>.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-neutral-500"
      >
        <span>Based in India</span>
        <motion.a
          href="#work"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-neutral-300"
        >
          <span>Scroll</span>
          <span className="text-xl">↓</span>
        </motion.a>
        <span>Selected Works Below</span>
      </motion.div>
    </section>
  );
}
