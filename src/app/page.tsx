import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import { listProjects, serializeProject } from "@/lib/db/projects";
import { listClients, serializeClient } from "@/lib/db/clients";
import { listCategories, serializeCategory } from "@/lib/db/categories";
import { getSiteContent, serializeSiteContent } from "@/lib/db/siteContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectDocs, clientDocs, categoryDocs, contentDoc] = await Promise.all([
    listProjects(),
    listClients(),
    listCategories(),
    getSiteContent(),
  ]);

  const projects = projectDocs.map(serializeProject);
  const clients = clientDocs.map(serializeClient);
  const categories = categoryDocs.map(serializeCategory);
  const content = serializeSiteContent(contentDoc);

  return (
    <>
      <Nav contactPhone={content.contactPhone} />
      <main>
        <Hero
          eyebrow={content.heroEyebrow}
          title={content.heroTitle}
          tagline={content.heroTagline}
          stats={content.stats}
        />
        <Clients clients={clients} />
        <SelectedWorks projects={projects} categories={categories} />
        <Contact email={content.contactEmail} phone={content.contactPhone} />
      </main>
    </>
  );
}
