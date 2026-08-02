"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40";
const labelClass = "block font-mono text-xs uppercase tracking-widest text-neutral-400";

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = category ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
    const method = category ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("Failed to save category");
      setSaving(false);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!category) return;
    if (!confirm("Delete this category? Projects using it will keep the old category name.")) return;
    await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <label className={labelClass}>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
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
        {category && (
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
