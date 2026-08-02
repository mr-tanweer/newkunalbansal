"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, Platform, Project } from "@/lib/types";
import { GRADIENT_OPTIONS } from "@/lib/gradients";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40";
const labelClass = "block font-mono text-xs uppercase tracking-widest text-neutral-400";

const videoIdPlaceholder: Record<Platform, string> = {
  vimeo: "e.g. 1110586931",
  youtube: "e.g. 1z98ssEbzi8",
  instagram: "e.g. DA1b2C3dEfg (reel shortcode)",
};

export default function ProjectForm({
  project,
  categories,
}: {
  project?: Project;
  categories: Category[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [category, setCategory] = useState(project?.category ?? categories[0]?.name ?? "");
  const [platform, setPlatform] = useState<Platform>(project?.platform ?? "vimeo");
  const [videoId, setVideoId] = useState(project?.videoId ?? "");
  const [thumbnail, setThumbnail] = useState(project?.thumbnail ?? "");
  const [gradient, setGradient] = useState(project?.gradient ?? GRADIENT_OPTIONS[0]);
  const [saving, setSaving] = useState(false);
  const [fetchingThumb, setFetchingThumb] = useState(false);
  const [error, setError] = useState("");

  const handleAutoFetchThumbnail = async () => {
    if (!videoId) return;
    setFetchingThumb(true);
    try {
      const res = await fetch(
        `/api/admin/thumbnail?platform=${platform}&videoId=${encodeURIComponent(videoId)}`
      );
      const data = await res.json();
      if (data.thumbnail) setThumbnail(data.thumbnail);
    } finally {
      setFetchingThumb(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = project ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, client, category, platform, videoId, thumbnail, gradient }),
    });

    if (!res.ok) {
      setError("Failed to save project");
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!project) return;
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <label className={labelClass}>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Client
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          className={inputClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={inputClass}
          >
            {categories.length === 0 && <option value="">No categories yet</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Platform
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className={inputClass}
          >
            <option value="vimeo">Vimeo</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>
        </label>
      </div>

      <label className={labelClass}>
        Video ID
        <input
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          required
          placeholder={videoIdPlaceholder[platform]}
          className={inputClass}
        />
      </label>

      <div>
        <label className={labelClass}>
          Thumbnail Image URL
          <div className="mt-2 flex gap-2">
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Auto-fetched from video, or paste your own"
              className={`${inputClass} mt-0`}
            />
            <button
              type="button"
              onClick={handleAutoFetchThumbnail}
              disabled={!videoId || fetchingThumb}
              className="shrink-0 rounded-lg border border-white/15 px-4 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:border-white/40 disabled:opacity-40"
            >
              {fetchingThumb ? "Fetching…" : "Auto-fetch"}
            </button>
          </div>
        </label>
        {thumbnail && (
          <div className="mt-2 h-24 w-40 overflow-hidden rounded-lg border border-white/10 bg-neutral-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnail} alt="Thumbnail preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      <label className={labelClass}>
        Gradient (fallback thumbnail color)
        <select
          value={gradient}
          onChange={(e) => setGradient(e.target.value)}
          className={inputClass}
        >
          {GRADIENT_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <div className={`mt-2 h-8 w-full rounded-md bg-gradient-to-br ${gradient}`} />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full border border-white/30 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {project && (
          <button
            type="button"
            onClick={handleDelete}
            className="font-mono text-xs uppercase tracking-widest text-red-400 transition-colors hover:text-red-300"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
