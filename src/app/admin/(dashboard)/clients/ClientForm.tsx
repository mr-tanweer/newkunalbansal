"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Client } from "@/lib/types";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40";
const labelClass = "block font-mono text-xs uppercase tracking-widest text-neutral-400";

export default function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  const [name, setName] = useState(client?.name ?? "");
  const [logo, setLogo] = useState(client?.logo ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let logoUrl = client?.logo ?? "";

    if (logoFile) {
      const uploadData = new FormData();
      uploadData.append("file", logoFile);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) {
        setError("Failed to upload logo");
        setSaving(false);
        return;
      }

      logoUrl = (await uploadRes.json()).url;
    }

    if (!logoUrl) {
      setError("Please choose a logo image");
      setSaving(false);
      return;
    }

    const url = client ? `/api/admin/clients/${client.id}` : "/api/admin/clients";
    const method = client ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, logo: logoUrl }),
    });

    if (!res.ok) {
      setError("Failed to save client");
      setSaving(false);
      return;
    }

    router.push("/admin/clients");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!client) return;
    if (!confirm("Delete this client?")) return;
    await fetch(`/api/admin/clients/${client.id}`, { method: "DELETE" });
    router.push("/admin/clients");
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

      <label className={labelClass}>
        Logo Image
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          onChange={handleFileChange}
          required={!client}
          className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-widest file:text-white`}
        />
      </label>

      {logo && (
        <div className="flex h-16 items-center rounded-lg border border-white/10 bg-neutral-950 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Logo preview" className="h-9 w-auto object-contain" />
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full border border-white/30 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {client && (
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
