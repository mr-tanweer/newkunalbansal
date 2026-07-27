import type { Project } from "@/lib/types";

export function thumbnailFor(project: Project) {
  return project.platform === "vimeo"
    ? `https://vumbnail.com/${project.videoId}.jpg`
    : `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
}
