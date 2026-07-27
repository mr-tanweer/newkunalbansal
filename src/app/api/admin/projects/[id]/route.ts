import { NextResponse } from "next/server";
import {
  getProjectById,
  updateProject,
  deleteProject,
  serializeProject,
} from "@/lib/db/projects";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeProject(project));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const update: Record<string, string> = {};
  for (const key of ["title", "client", "category", "platform", "videoId", "gradient"]) {
    if (typeof body[key] === "string") update[key] = body[key];
  }

  const project = await updateProject(id, update);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeProject(project));
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ok = await deleteProject(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
