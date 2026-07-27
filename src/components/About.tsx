"use client";

import { motion } from "framer-motion";

export default function About({
  heading,
  paragraph,
  photo,
}: {
  heading: string;
  paragraph: string;
  photo: string;
}) {
  return (
    <section id="about" className="border-t border-white/10 px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.4em] text-neutral-400">About</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">{heading}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-300">{paragraph}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="Kunal Bansal" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
