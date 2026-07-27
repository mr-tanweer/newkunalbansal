import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import { listProjects, serializeProject } from "@/lib/db/projects";
import { listClients, serializeClient } from "@/lib/db/clients";
import { getSiteContent, serializeSiteContent } from "@/lib/db/siteContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectDocs, clientDocs, contentDoc] = await Promise.all([
    listProjects(),
    listClients(),
    getSiteContent(),
  ]);

  const projects = projectDocs.map(serializeProject);
  const clients = clientDocs.map(serializeClient);
  const content = serializeSiteContent(contentDoc);

  return (
    <>
      <Nav contactEmail={content.contactEmail} />
      <main>
        <Hero
          eyebrow={content.heroEyebrow}
          title={content.heroTitle}
          tagline={content.heroTagline}
          stats={content.stats}
        />
        <Clients clients={clients} />
        <SelectedWorks projects={projects} />
        <About
          heading={content.aboutHeading}
          paragraph={content.aboutParagraph}
          photo={content.profilePhoto}
        />
        <Contact email={content.contactEmail} phone={content.contactPhone} />
      </main>
    </>
  );
}
