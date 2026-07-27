import { NextResponse } from "next/server";
import {
  getClientById,
  updateClient,
  deleteClient,
  serializeClient,
} from "@/lib/db/clients";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const client = await getClientById(id);
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeClient(client));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const update: Record<string, string> = {};
  if (typeof body.name === "string") update.name = body.name;
  if (typeof body.logo === "string") update.logo = body.logo;

  const client = await updateClient(id, update);
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeClient(client));
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ok = await deleteClient(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
