import { NextResponse } from "next/server";
import { moveProject } from "@/lib/db/projects";

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

  await moveProject(id, direction);
  return NextResponse.json({ ok: true });
}
