"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";

export default function VideoModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const src = project
    ? project.platform === "vimeo"
      ? `https://player.vimeo.com/video/${project.videoId}?autoplay=1&title=0&byline=0&portrait=0`
      : `https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`
    : "";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900 shadow-2xl">
              <iframe
                src={src}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between text-white">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <span className="font-mono text-sm text-neutral-400">{project.client}</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-12 right-0 font-mono text-sm uppercase tracking-widest text-neutral-300 transition-colors hover:text-white sm:top-auto sm:-right-12 sm:-translate-y-1/2"
            >
              Close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
