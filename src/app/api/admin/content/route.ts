import { NextResponse } from "next/server";
import { getSiteContent, updateSiteContent, serializeSiteContent } from "@/lib/db/siteContent";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(serializeSiteContent(content));
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (typeof body.heroEyebrow === "string") update.heroEyebrow = body.heroEyebrow;
  if (typeof body.heroTitle === "string") update.heroTitle = body.heroTitle;
  if (typeof body.heroTagline === "string") update.heroTagline = body.heroTagline;
  if (typeof body.aboutHeading === "string") update.aboutHeading = body.aboutHeading;
  if (typeof body.aboutParagraph === "string") update.aboutParagraph = body.aboutParagraph;
  if (typeof body.profilePhoto === "string") update.profilePhoto = body.profilePhoto;
  if (typeof body.contactEmail === "string") update.contactEmail = body.contactEmail;
  if (typeof body.contactPhone === "string") update.contactPhone = body.contactPhone;
  if (
    Array.isArray(body.stats) &&
    body.stats.every(
      (s: unknown) =>
        s !== null &&
        typeof s === "object" &&
        typeof (s as Record<string, unknown>).value === "string" &&
        typeof (s as Record<string, unknown>).label === "string"
    )
  ) {
    update.stats = body.stats;
  }

  const content = await updateSiteContent(update);
  return NextResponse.json(serializeSiteContent(content));
}
