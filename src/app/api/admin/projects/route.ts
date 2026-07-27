import { NextResponse } from "next/server";
import { listProjects, createProject, serializeProject } from "@/lib/db/projects";

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
    typeof body.category !== "string" ||
    typeof body.platform !== "string" ||
    typeof body.videoId !== "string" ||
    typeof body.gradient !== "string"
  ) {
    return NextResponse.json({ error: "Invalid project data" }, { status: 400 });
  }

  const project = await createProject({
    title: body.title,
    client: body.client,
    category: body.category,
    platform: body.platform,
    videoId: body.videoId,
    gradient: body.gradient,
  });

  return NextResponse.json(serializeProject(project), { status: 201 });
}
