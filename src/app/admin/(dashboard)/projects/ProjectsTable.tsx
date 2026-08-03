"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";
import { thumbnailFor } from "@/lib/thumbnail";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reorder = async (id: string, position: number) => {
    setReorderingId(id);
    await fetch(`/api/admin/projects/${id}/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position }),
    });
    router.refresh();
    setReorderingId(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <th className="px-4 py-3">Thumbnail</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={project.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                <div className="h-12 w-20 overflow-hidden rounded-md bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailFor(project)}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className="px-4 py-3 text-white">{project.title}</td>
              <td className="px-4 py-3 text-neutral-400">{project.client}</td>
              <td className="px-4 py-3 text-neutral-400">{project.categories.join(", ")}</td>
              <td className="px-4 py-3 text-neutral-400">{project.platform}</td>
              <td className="px-4 py-3">
                <input
                  key={i}
                  type="number"
                  min={1}
                  max={projects.length}
                  defaultValue={i + 1}
                  disabled={reorderingId === project.id}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (value && value !== i + 1) reorder(project.id, value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="w-14 rounded border border-white/15 bg-black px-2 py-1 text-center text-white outline-none focus:border-white/40 disabled:opacity-40"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
                  <Link href={`/admin/projects/${project.id}`} className="text-neutral-300 hover:text-white">
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(project.id)}
                    disabled={deletingId === project.id}
                    className="text-red-400 hover:text-red-300 disabled:opacity-40"
                  >
                    {deletingId === project.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
