import { listCategories, serializeCategory } from "@/lib/db/categories";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const categories = (await listCategories()).map(serializeCategory);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">New Project</h1>
      <ProjectForm categories={categories} />
    </div>
  );
}
