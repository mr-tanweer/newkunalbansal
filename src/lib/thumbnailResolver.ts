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
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
      8000
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
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
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  if (platform === "vimeo") {
    const resolved = await resolveVimeoThumbnail(videoId);
    return resolved ?? `https://vumbnail.com/${videoId}.jpg`;
  }
  // Instagram has no public unauthenticated thumbnail endpoint —
  // caller must supply a manual thumbnail.
  return null;
}
