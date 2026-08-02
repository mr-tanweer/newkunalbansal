import type { Project } from "@/lib/types";

export function thumbnailFor(project: Project) {
  if (project.thumbnail) return project.thumbnail;

  if (project.platform === "youtube") {
    return `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
  }
  if (project.platform === "vimeo") {
    return `https://vumbnail.com/${project.videoId}.jpg`;
  }
  return "";
}
