"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="font-display text-lg tracking-wide">
          KUNAL BANSAL
        </a>

        <div className="hidden items-center gap-10 font-mono text-sm uppercase tracking-widest text-neutral-300 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:kunalbansal11@gmail.com"
            className="rounded-full border border-white/30 px-4 py-2 text-xs tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-6 border-t border-white/10 bg-black px-6 py-8 font-mono text-lg uppercase tracking-widest sm:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
