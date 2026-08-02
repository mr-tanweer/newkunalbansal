import { notFound } from "next/navigation";
import { getCategoryById, serializeCategory } from "@/lib/db/categories";
import CategoryForm from "../CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getCategoryById(id);
  if (!doc) notFound();

  const category = serializeCategory(doc);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
