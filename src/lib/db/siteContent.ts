import { getDb } from "./mongodb";
import type { SiteContent, Stat } from "@/lib/types";

export type SiteContentDoc = {
  _id: "singleton";
  heroEyebrow: string;
  heroTitle: string;
  heroTagline: string;
  aboutHeading: string;
  aboutParagraph: string;
  profilePhoto: string;
  stats: Stat[];
  contactEmail: string;
  contactPhone: string;
  updatedAt: Date;
};

const DEFAULTS: Omit<SiteContentDoc, "_id" | "updatedAt"> = {
  heroEyebrow: "Film Director — 10+ Years",
  heroTitle: "KUNAL BANSAL",
  heroTagline:
    "Crafting advertisements, fiction, corporate films and documentaries that have collectively earned 150 million+ views.",
  aboutHeading: "A filmmaker with a decade of stories told.",
  aboutParagraph:
    "Kunal Bansal is a film graduate and director with 10+ years of experience in the industry.",
  profilePhoto: "/kunalimage.jpg",
  stats: [
    { value: "10+", label: "Years of Experience" },
    { value: "150M+", label: "Views Collectively" },
    { value: "9+", label: "Brands Worked With" },
    { value: "4", label: "Formats — Ads, Fiction, Corporate, Docs" },
  ],
  contactEmail: "kunalbansal11@gmail.com",
  contactPhone: "+91-9991100099",
};

function collection() {
  return getDb().then((db) => db.collection<SiteContentDoc>("siteContent"));
}

export function serializeSiteContent(doc: SiteContentDoc): SiteContent {
  return {
    heroEyebrow: doc.heroEyebrow ?? DEFAULTS.heroEyebrow,
    heroTitle: doc.heroTitle ?? DEFAULTS.heroTitle,
    heroTagline: doc.heroTagline ?? DEFAULTS.heroTagline,
    aboutHeading: doc.aboutHeading,
    aboutParagraph: doc.aboutParagraph,
    profilePhoto: doc.profilePhoto ?? DEFAULTS.profilePhoto,
    stats: doc.stats,
    contactEmail: doc.contactEmail,
    contactPhone: doc.contactPhone,
  };
}

export async function getSiteContent(): Promise<SiteContentDoc> {
  const col = await collection();
  const existing = await col.findOne({ _id: "singleton" });
  if (existing) return existing;

  const doc: SiteContentDoc = { _id: "singleton", ...DEFAULTS, updatedAt: new Date() };
  await col.insertOne(doc);
  return doc;
}

export async function updateSiteContent(
  input: Partial<Omit<SiteContentDoc, "_id" | "updatedAt">>
): Promise<SiteContentDoc> {
  const col = await collection();
  await col.updateOne(
    { _id: "singleton" },
    { $set: { ...input, updatedAt: new Date() } },
    { upsert: true }
  );
  return (await col.findOne({ _id: "singleton" }))!;
}
