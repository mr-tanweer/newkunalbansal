import { NextResponse } from "next/server";
import { reorderCategory } from "@/lib/db/categories";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const position = Number(body?.position);

  if (!Number.isFinite(position) || position < 1) {
    return NextResponse.json({ error: "Invalid position" }, { status: 400 });
  }

  await reorderCategory(id, position);
  return NextResponse.json({ ok: true });
}
