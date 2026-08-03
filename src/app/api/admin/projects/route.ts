import { NextResponse } from "next/server";
import { listProjects, createProject, serializeProject } from "@/lib/db/projects";
import { resolveThumbnail } from "@/lib/thumbnailResolver";
import type { Platform } from "@/lib/types";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json(projects.map(serializeProject));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.title !== "string" ||
    typeof body.client !== "string" ||
    !Array.isArray(body.categories) ||
    body.categories.length === 0 ||
    !body.categories.every((c: unknown) => typeof c === "string") ||
    typeof body.showInAll !== "boolean" ||
    typeof body.platform !== "string" ||
    typeof body.videoId !== "string" ||
    typeof body.gradient !== "string"
  ) {
    return NextResponse.json({ error: "Invalid project data" }, { status: 400 });
  }

  const manualThumbnail = typeof body.thumbnail === "string" ? body.thumbnail.trim() : "";
  const thumbnail =
    manualThumbnail || (await resolveThumbnail(body.platform as Platform, body.videoId)) || "";

  const project = await createProject({
    title: body.title,
    client: body.client,
    categories: body.categories,
    showInAll: body.showInAll,
    platform: body.platform,
    videoId: body.videoId,
    thumbnail,
    gradient: body.gradient,
  });

  return NextResponse.json(serializeProject(project), { status: 201 });
}
