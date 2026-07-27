import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";
import type { Project, Category, Platform } from "@/lib/types";

export type ProjectDoc = {
  _id: ObjectId;
  title: string;
  client: string;
  category: Category;
  platform: Platform;
  videoId: string;
  gradient: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewProjectInput = {
  title: string;
  client: string;
  category: Category;
  platform: Platform;
  videoId: string;
  gradient: string;
};

function collection() {
  return getDb().then((db) => db.collection<ProjectDoc>("projects"));
}

export function serializeProject(doc: WithId<Document> | ProjectDoc): Project {
  const d = doc as ProjectDoc;
  return {
    id: d._id.toString(),
    title: d.title,
    client: d.client,
    category: d.category,
    platform: d.platform,
    videoId: d.videoId,
    gradient: d.gradient,
    order: d.order,
  };
}

export async function listProjects(): Promise<ProjectDoc[]> {
  const col = await collection();
  return col.find({}).sort({ order: 1, _id: 1 }).toArray();
}

export async function getProjectById(id: string): Promise<ProjectDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return col.findOne({ _id: new ObjectId(id) });
}

export async function createProject(input: NewProjectInput): Promise<ProjectDoc> {
  const col = await collection();
  const last = await col.find({}).sort({ order: -1 }).limit(1).toArray();
  const order = last.length > 0 ? last[0].order + 1 : 0;
  const now = new Date();
  const doc: ProjectDoc = {
    _id: new ObjectId(),
    ...input,
    order,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function updateProject(
  id: string,
  input: Partial<NewProjectInput>
): Promise<ProjectDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } }
  );
  return col.findOne({ _id: new ObjectId(id) });
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await collection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

export async function moveProject(id: string, direction: "up" | "down"): Promise<void> {
  const col = await collection();
  const sorted = await col.find({}).sort({ order: 1, _id: 1 }).toArray();
  const index = sorted.findIndex((p) => p._id.toString() === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= sorted.length) return;

  const current = sorted[index];
  const swapWith = sorted[swapIndex];

  await col.updateOne({ _id: current._id }, { $set: { order: swapWith.order } });
  await col.updateOne({ _id: swapWith._id }, { $set: { order: current.order } });
}
