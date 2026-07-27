"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Category, Project } from "@/lib/types";
import { thumbnailFor } from "@/lib/thumbnail";
import VideoModal from "@/components/VideoModal";

const INITIAL_COUNT = 9;
const FILTERS: Array<Category | "All"> = ["All", "Commercial", "Behind the Scenes"];

function ProjectThumb({ project }: { project: Project }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumbnailFor(project)}
      alt={project.title}
      loading="lazy"
      onError={() => setErrored(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export default function SelectedWorks({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="px-6 py-28 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 max-w-2xl"
      >
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.4em] text-neutral-400">
          Selected Works
        </p>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          A curated collection of film, commercial &amp; branded content.
        </h2>
      </motion.div>

      <div className="mb-12 flex flex-wrap gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setVisible(INITIAL_COUNT);
            }}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              filter === f
                ? "border-white bg-white text-black"
                : "border-white/30 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, visible).map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setActive(project)}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900">
              <ProjectThumb project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-colors duration-300 group-hover:from-black/80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium text-white transition-colors group-hover:text-neutral-300">
                {project.title}
              </h3>
              <span className="whitespace-nowrap font-mono text-sm text-neutral-500">
                {project.client}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 9)}
            className="rounded-full border border-white/30 px-8 py-3 font-mono text-sm uppercase tracking-widest transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Load More
          </button>
        </div>
      )}

      <VideoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
