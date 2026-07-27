"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent, Stat } from "@/lib/types";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40";
const labelClass = "block font-mono text-xs uppercase tracking-widest text-neutral-400";

export default function SiteContentForm({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [heroEyebrow, setHeroEyebrow] = useState(content.heroEyebrow);
  const [heroTitle, setHeroTitle] = useState(content.heroTitle);
  const [heroTagline, setHeroTagline] = useState(content.heroTagline);
  const [aboutHeading, setAboutHeading] = useState(content.aboutHeading);
  const [aboutParagraph, setAboutParagraph] = useState(content.aboutParagraph);
  const [profilePhoto, setProfilePhoto] = useState(content.profilePhoto);
  const [stats, setStats] = useState<Stat[]>(content.stats);
  const [contactEmail, setContactEmail] = useState(content.contactEmail);
  const [contactPhone, setContactPhone] = useState(content.contactPhone);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroEyebrow,
        heroTitle,
        heroTagline,
        aboutHeading,
        aboutParagraph,
        profilePhoto,
        stats,
        contactEmail,
        contactPhone,
      }),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Failed to save");
      return;
    }
    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="space-y-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500">Hero</h2>
        <label className={labelClass}>
          Eyebrow badge text
          <input
            value={heroEyebrow}
            onChange={(e) => setHeroEyebrow(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Title
          <input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Tagline
          <textarea
            value={heroTagline}
            onChange={(e) => setHeroTagline(e.target.value)}
            required
            rows={3}
            className={inputClass}
          />
        </label>
      </div>

      <div className="space-y-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500">About</h2>
        <label className={labelClass}>
          Heading
          <input
            value={aboutHeading}
            onChange={(e) => setAboutHeading(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Paragraph
          <textarea
            value={aboutParagraph}
            onChange={(e) => setAboutParagraph(e.target.value)}
            required
            rows={4}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Photo Image URL
          <input
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            required
            placeholder="https://example.com/photo.jpg"
            className={inputClass}
          />
        </label>
        {profilePhoto && (
          <div className="h-40 w-32 overflow-hidden rounded-lg border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profilePhoto} alt="Profile preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500">Stats</h2>
        {stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Value
              <input
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                required
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Label
              <input
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                required
                className={inputClass}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500">Contact</h2>
        <label className={labelClass}>
          Email
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && <p className="text-sm text-emerald-400">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full border border-white/30 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
