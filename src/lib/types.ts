export type Category = "Commercial" | "Behind the Scenes";
export type Platform = "vimeo" | "youtube";

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Category;
  platform: Platform;
  videoId: string;
  gradient: string;
  order: number;
};

export type Client = {
  id: string;
  name: string;
  logo: string;
  order: number;
};

export type Stat = {
  value: string;
  label: string;
};

export type SiteContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroTagline: string;
  aboutHeading: string;
  aboutParagraph: string;
  profilePhoto: string;
  stats: Stat[];
  contactEmail: string;
  contactPhone: string;
};
