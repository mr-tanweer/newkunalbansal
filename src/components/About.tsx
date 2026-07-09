"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-t border-white/10 px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-400">About</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            A filmmaker with a decade of stories told.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-300">
            Kunal Bansal is a film graduate and director with 10+ years of experience
            crafting advertisements, fiction, corporate videos and documentaries for some
            of the world&apos;s most recognisable brands. His work has collectively
            crossed 150 million views — built one honest frame at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-white/10 pt-4"
            >
              <p className="font-display text-4xl sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-neutral-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
