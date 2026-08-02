import { NextResponse } from "next/server";
import { resolveThumbnail } from "@/lib/thumbnailResolver";
import type { Platform } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const videoId = searchParams.get("videoId");

  if (
    !videoId ||
    (platform !== "vimeo" && platform !== "youtube" && platform !== "instagram")
  ) {
    return NextResponse.json({ error: "Invalid platform or videoId" }, { status: 400 });
  }

  const thumbnail = await resolveThumbnail(platform as Platform, videoId);
  return NextResponse.json({ thumbnail });
}
