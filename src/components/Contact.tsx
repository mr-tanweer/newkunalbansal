"use client";

import { motion } from "framer-motion";

export default function Contact({ email, phone }: { email: string; phone: string }) {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-28 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.4em] text-neutral-400">Get In Touch</p>
        <h2 className="font-display max-w-3xl text-4xl leading-tight sm:text-6xl">
          Have a story worth telling? Let&apos;s make it.
        </h2>

        <a
          href={`mailto:${email}`}
          className="group mt-10 inline-flex items-center gap-4 text-2xl text-white transition-colors hover:text-neutral-300 sm:text-4xl"
        >
          {email}
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </a>

        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          className="mt-4 block font-mono text-lg text-neutral-400 transition-colors hover:text-white"
        >
          {phone}
        </a>
      </motion.div>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 font-mono text-sm text-neutral-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Kunal Bansal. All rights reserved.</p>
      </div>
    </section>
  );
}
