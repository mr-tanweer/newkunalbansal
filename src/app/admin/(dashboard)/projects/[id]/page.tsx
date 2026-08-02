import { notFound } from "next/navigation";
import { getProjectById, serializeProject } from "@/lib/db/projects";
import { listCategories, serializeCategory } from "@/lib/db/categories";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [doc, categoryDocs] = await Promise.all([getProjectById(id), listCategories()]);
  if (!doc) notFound();

  const project = serializeProject(doc);
  const categories = categoryDocs.map(serializeCategory);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Edit Project</h1>
      <ProjectForm project={project} categories={categories} />
    </div>
  );
}
