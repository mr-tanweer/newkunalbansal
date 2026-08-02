import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";
import type { Category } from "@/lib/types";

export type CategoryDoc = {
  _id: ObjectId;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCategoryInput = {
  name: string;
};

function collection() {
  return getDb().then((db) => db.collection<CategoryDoc>("categories"));
}

export function serializeCategory(doc: WithId<Document> | CategoryDoc): Category {
  const d = doc as CategoryDoc;
  return {
    id: d._id.toString(),
    name: d.name,
    order: d.order,
  };
}

export async function listCategories(): Promise<CategoryDoc[]> {
  const col = await collection();
  return col.find({}).sort({ order: 1, _id: 1 }).toArray();
}

export async function getCategoryById(id: string): Promise<CategoryDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return col.findOne({ _id: new ObjectId(id) });
}

export async function createCategory(input: NewCategoryInput): Promise<CategoryDoc> {
  const col = await collection();
  const last = await col.find({}).sort({ order: -1 }).limit(1).toArray();
  const order = last.length > 0 ? last[0].order + 1 : 0;
  const now = new Date();
  const doc: CategoryDoc = {
    _id: new ObjectId(),
    ...input,
    order,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function updateCategory(
  id: string,
  input: Partial<NewCategoryInput> & { order?: number }
): Promise<CategoryDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } }
  );
  return col.findOne({ _id: new ObjectId(id) });
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await collection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

export async function moveCategory(id: string, direction: "up" | "down"): Promise<void> {
  const col = await collection();
  const sorted = await col.find({}).sort({ order: 1, _id: 1 }).toArray();
  const index = sorted.findIndex((c) => c._id.toString() === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= sorted.length) return;

  const current = sorted[index];
  const swapWith = sorted[swapIndex];

  await col.updateOne({ _id: current._id }, { $set: { order: swapWith.order } });
  await col.updateOne({ _id: swapWith._id }, { $set: { order: current.order } });
}

/** Moves a category to an exact 1-based position, renumbering the whole list. */
export async function reorderCategory(id: string, position: number): Promise<void> {
  const col = await collection();
  const sorted = await col.find({}).sort({ order: 1, _id: 1 }).toArray();
  const fromIndex = sorted.findIndex((c) => c._id.toString() === id);
  if (fromIndex === -1) return;

  const [moved] = sorted.splice(fromIndex, 1);
  const toIndex = Math.min(Math.max(position - 1, 0), sorted.length);
  sorted.splice(toIndex, 0, moved);

  await Promise.all(
    sorted.map((doc, i) => col.updateOne({ _id: doc._id }, { $set: { order: i } }))
  );
}
