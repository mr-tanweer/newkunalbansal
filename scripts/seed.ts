import { getDb } from "../src/lib/db/mongodb";
import { resolveThumbnail } from "../src/lib/thumbnailResolver";
import { seedProjects, seedCategories, seedClients, seedSiteContent } from "./seed-data";

async function main() {
  const force = process.argv.includes("--force");
  const db = await getDb();

  const projectsCol = db.collection("projects");
  const categoriesCol = db.collection("categories");
  const clientsCol = db.collection("clients");
  const contentCol = db.collection("siteContent");

  const [existingProjects, existingCategories, existingClients, existingContent] =
    await Promise.all([
      projectsCol.countDocuments(),
      categoriesCol.countDocuments(),
      clientsCol.countDocuments(),
      contentCol.countDocuments({ _id: "singleton" as never }),
    ]);

  const hasExisting =
    existingProjects > 0 || existingCategories > 0 || existingClients > 0 || existingContent > 0;

  if (hasExisting && !force) {
    console.log(
      `Database already has data (projects: ${existingProjects}, categories: ${existingCategories}, clients: ${existingClients}, siteContent: ${existingContent}). Pass --force to overwrite.`
    );
    process.exit(0);
  }

  if (force) {
    await Promise.all([
      projectsCol.deleteMany({}),
      categoriesCol.deleteMany({}),
      clientsCol.deleteMany({}),
      contentCol.deleteMany({}),
    ]);
  }

  const now = new Date();

  console.log("Resolving thumbnails…");
  const projectDocs = await Promise.all(
    seedProjects.map(async (p, i) => ({
      ...p,
      thumbnail: (await resolveThumbnail(p.platform, p.videoId)) ?? "",
      order: i,
      createdAt: now,
      updatedAt: now,
    }))
  );

  const categoryDocs = seedCategories.map((c, i) => ({
    ...c,
    order: i,
    createdAt: now,
    updatedAt: now,
  }));

  const clientDocs = seedClients.map((c, i) => ({
    ...c,
    order: i,
    createdAt: now,
    updatedAt: now,
  }));

  await projectsCol.insertMany(projectDocs);
  await categoriesCol.insertMany(categoryDocs);
  await clientsCol.insertMany(clientDocs);
  await contentCol.insertOne({ _id: "singleton" as never, ...seedSiteContent, updatedAt: now });

  console.log(
    `Seeded ${projectDocs.length} projects, ${categoryDocs.length} categories, ${clientDocs.length} clients, and 1 site content document.`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
