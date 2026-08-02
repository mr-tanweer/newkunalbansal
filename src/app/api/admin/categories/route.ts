import { NextResponse } from "next/server";
import { listCategories, createCategory, serializeCategory } from "@/lib/db/categories";

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json(categories.map(serializeCategory));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Invalid category data" }, { status: 400 });
  }

  const category = await createCategory({ name: body.name.trim() });
  return NextResponse.json(serializeCategory(category), { status: 201 });
}
