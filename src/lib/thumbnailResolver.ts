import type { Platform } from "@/lib/types";

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function resolveVimeoThumbnail(videoId: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=1280`,
      8000
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}

async function resolveYoutubeThumbnail(videoId: string): Promise<string> {
  const maxres = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  try {
    const res = await fetchWithTimeout(maxres, 6000);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      // YouTube serves a small greyish placeholder (a few KB) with a 200 status
      // when no maxres thumbnail was ever uploaded for the video — real
      // maxresdefault images are consistently much larger than that.
      if (buf.byteLength > 5000) return maxres;
    }
  } catch {
    // fall through to hqdefault
  }
  return fallback;
}

/**
 * Best-effort server-side thumbnail resolution for a platform + videoId.
 * Falls back to null if nothing could be resolved (caller decides the fallback).
 */
export async function resolveThumbnail(
  platform: Platform,
  videoId: string
): Promise<string | null> {
  if (platform === "youtube") {
    return resolveYoutubeThumbnail(videoId);
  }
  if (platform === "vimeo") {
    const resolved = await resolveVimeoThumbnail(videoId);
    return resolved ?? `https://vumbnail.com/${videoId}.jpg`;
  }
  // Instagram has no public unauthenticated thumbnail endpoint —
  // caller must supply a manual thumbnail.
  return null;
}
