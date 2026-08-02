import { NextResponse } from "next/server";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
  serializeCategory,
} from "@/lib/db/categories";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const category = await getCategoryById(id);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeCategory(category));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const update: { name?: string; order?: number } = {};
  if (typeof body.name === "string" && body.name.trim()) update.name = body.name.trim();
  if (typeof body.order === "number" && Number.isFinite(body.order)) update.order = body.order;

  const category = await updateCategory(id, update);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeCategory(category));
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ok = await deleteCategory(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
