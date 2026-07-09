"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";

const INITIAL_COUNT = 6;

export default function SelectedWorks() {
  const [visible, setVisible] = useState(INITIAL_COUNT);

  return (
    <section id="work" className="px-6 py-28 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-400">Selected Works</p>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          A curated collection of film, commercial &amp; branded content.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visible).map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="group cursor-pointer"
          >
            <div
              className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
            >
              <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-widest text-white backdrop-blur">
                {project.category}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-lg font-medium text-white transition-colors group-hover:text-neutral-300">
                {project.title}
              </h3>
              <span className="text-sm text-neutral-500">{project.client}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {visible < projects.length && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="rounded-full border border-white/30 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
