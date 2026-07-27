import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";
import type { Client } from "@/lib/types";

export type ClientDoc = {
  _id: ObjectId;
  name: string;
  logo: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewClientInput = {
  name: string;
  logo: string;
};

function collection() {
  return getDb().then((db) => db.collection<ClientDoc>("clients"));
}

export function serializeClient(doc: WithId<Document> | ClientDoc): Client {
  const d = doc as ClientDoc;
  return {
    id: d._id.toString(),
    name: d.name,
    logo: d.logo,
    order: d.order,
  };
}

export async function listClients(): Promise<ClientDoc[]> {
  const col = await collection();
  return col.find({}).sort({ order: 1, _id: 1 }).toArray();
}

export async function getClientById(id: string): Promise<ClientDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return col.findOne({ _id: new ObjectId(id) });
}

export async function createClient(input: NewClientInput): Promise<ClientDoc> {
  const col = await collection();
  const last = await col.find({}).sort({ order: -1 }).limit(1).toArray();
  const order = last.length > 0 ? last[0].order + 1 : 0;
  const now = new Date();
  const doc: ClientDoc = {
    _id: new ObjectId(),
    ...input,
    order,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function updateClient(
  id: string,
  input: Partial<NewClientInput>
): Promise<ClientDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } }
  );
  return col.findOne({ _id: new ObjectId(id) });
}

export async function deleteClient(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await collection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

export async function moveClient(id: string, direction: "up" | "down"): Promise<void> {
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
