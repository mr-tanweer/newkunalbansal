"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-28 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-400">Get In Touch</p>
        <h2 className="font-display max-w-3xl text-4xl leading-tight sm:text-6xl">
          Have a story worth telling? Let&apos;s make it.
        </h2>

        <a
          href="mailto:kunalbansal11@gmail.com"
          className="group mt-10 inline-flex items-center gap-4 text-2xl text-white transition-colors hover:text-neutral-300 sm:text-4xl"
        >
          kunalbansal11@gmail.com
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </a>

        <p className="mt-4 text-lg text-neutral-400">+91-9991100099</p>
      </motion.div>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Kunal Bansal. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-widest">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
