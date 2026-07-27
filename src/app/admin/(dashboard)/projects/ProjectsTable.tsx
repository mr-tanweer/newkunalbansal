"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";
import { thumbnailFor } from "@/lib/thumbnail";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [movingId, setMovingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const move = async (id: string, direction: "up" | "down") => {
    setMovingId(id);
    await fetch(`/api/admin/projects/${id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    router.refresh();
    setMovingId(null);
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
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => {
            const isMoving = movingId === project.id;
            return (
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
                <td className="px-4 py-3 text-neutral-400">{project.category}</td>
                <td className="px-4 py-3 text-neutral-400">{project.platform}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(project.id, "up")}
                      disabled={i === 0 || isMoving}
                      className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                    >
                      {isMoving ? (
                        <span className="h-2.5 w-2.5 animate-spin rounded-full border border-neutral-400 border-t-transparent" />
                      ) : (
                        "▲"
                      )}
                    </button>
                    <button
                      onClick={() => move(project.id, "down")}
                      disabled={i === projects.length - 1 || isMoving}
                      className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                    >
                      {isMoving ? (
                        <span className="h-2.5 w-2.5 animate-spin rounded-full border border-neutral-400 border-t-transparent" />
                      ) : (
                        "▼"
                      )}
                    </button>
                  </div>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
