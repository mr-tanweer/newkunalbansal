import { NextResponse } from "next/server";
import { moveCategory } from "@/lib/db/categories";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const direction = body?.direction;

  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "Invalid direction" }, { status: 400 });
  }

  await moveCategory(id, direction);
  return NextResponse.json({ ok: true });
}
