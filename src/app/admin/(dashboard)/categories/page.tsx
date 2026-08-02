import Link from "next/link";
import { listCategories, serializeCategory } from "@/lib/db/categories";
import CategoriesTable from "./CategoriesTable";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const docs = await listCategories();
  const categories = docs.map(serializeCategory);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-white">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-full border border-white/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          + New Category
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
