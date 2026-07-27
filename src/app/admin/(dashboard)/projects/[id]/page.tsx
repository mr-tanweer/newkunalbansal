import { notFound } from "next/navigation";
import { getProjectById, serializeProject } from "@/lib/db/projects";
import ProjectForm from "../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getProjectById(id);
  if (!doc) notFound();

  const project = serializeProject(doc);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
