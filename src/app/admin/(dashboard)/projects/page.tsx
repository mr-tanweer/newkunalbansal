import Link from "next/link";
import { listProjects, serializeProject } from "@/lib/db/projects";
import ProjectsTable from "./ProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const docs = await listProjects();
  const projects = docs.map(serializeProject);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full border border-white/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          + New Project
        </Link>
      </div>
      <ProjectsTable projects={projects} />
    </div>
  );
}
