"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoriesTable({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reorder = async (id: string, position: number) => {
    setReorderingId(id);
    await fetch(`/api/admin/categories/${id}/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position }),
    });
    router.refresh();
    setReorderingId(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this category? Projects using it will keep the old name.")) return;
    setDeletingId(id);
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr key={category.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3 text-white">{category.name}</td>
              <td className="px-4 py-3">
                <input
                  key={i}
                  type="number"
                  min={1}
                  max={categories.length}
                  defaultValue={i + 1}
                  disabled={reorderingId === category.id}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (value && value !== i + 1) reorder(category.id, value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="w-14 rounded border border-white/15 bg-black px-2 py-1 text-center text-white outline-none focus:border-white/40 disabled:opacity-40"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
                  <Link href={`/admin/categories/${category.id}`} className="text-neutral-300 hover:text-white">
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(category.id)}
                    disabled={deletingId === category.id}
                    className="text-red-400 hover:text-red-300 disabled:opacity-40"
                  >
                    {deletingId === category.id ? "Deleting…" : "Delete"}
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
