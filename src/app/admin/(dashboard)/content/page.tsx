import { getSiteContent, serializeSiteContent } from "@/lib/db/siteContent";
import SiteContentForm from "./SiteContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const doc = await getSiteContent();
  const content = serializeSiteContent(doc);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Site Content</h1>
      <SiteContentForm content={content} />
    </div>
  );
}
