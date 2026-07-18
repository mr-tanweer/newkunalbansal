export type Category = "Commercial" | "Behind the Scenes";
export type Platform = "vimeo" | "youtube";

export type Project = {
  title: string;
  client: string;
  category: Category;
  platform: Platform;
  videoId: string;
  gradient: string;
};

const COMMERCIAL_GRADIENTS = [
  "from-red-600 via-red-800 to-neutral-900",
  "from-sky-600 via-blue-800 to-slate-900",
  "from-amber-500 via-orange-700 to-red-900",
  "from-indigo-600 via-violet-700 to-neutral-900",
  "from-slate-600 via-slate-800 to-black",
  "from-emerald-500 via-green-700 to-neutral-900",
  "from-yellow-500 via-orange-600 to-red-700",
  "from-cyan-500 via-blue-700 to-indigo-900",
  "from-fuchsia-600 via-purple-800 to-neutral-900",
  "from-teal-600 via-cyan-800 to-neutral-900",
  "from-rose-600 via-red-800 to-neutral-900",
  "from-lime-500 via-green-700 to-emerald-900",
];

const BTS_GRADIENTS = [
  "from-neutral-600 via-neutral-800 to-black",
  "from-stone-600 via-stone-800 to-black",
  "from-zinc-600 via-zinc-800 to-black",
];

export const projects: Project[] = [
  // Commercials / Ad Films
  { title: "BookMyForex", client: "MakeMyTrip", category: "Commercial", platform: "vimeo", videoId: "1087482561", gradient: COMMERCIAL_GRADIENTS[0] },
  { title: "Finger Lickin' Frames feat. The Great Khali", client: "KFC", category: "Commercial", platform: "vimeo", videoId: "1110586931", gradient: COMMERCIAL_GRADIENTS[1] },
  { title: "Empire Cables DVC feat. Saxena Ji (Sanand Verma)", client: "Empire Cables", category: "Commercial", platform: "vimeo", videoId: "1126426592", gradient: COMMERCIAL_GRADIENTS[2] },
  { title: "Mouth Freshener DVC", client: "Director & DOP", category: "Commercial", platform: "vimeo", videoId: "1171708405", gradient: COMMERCIAL_GRADIENTS[3] },
  { title: "Toshiba Refrigerator", client: "Toshiba", category: "Commercial", platform: "vimeo", videoId: "1184318049", gradient: COMMERCIAL_GRADIENTS[4] },
  { title: "Yeast Protein Powder — Family Film", client: "Yoga Bar", category: "Commercial", platform: "vimeo", videoId: "1210625325", gradient: COMMERCIAL_GRADIENTS[5] },
  { title: "Yeast Protein Powder — Hostel Film", client: "Yoga Bar", category: "Commercial", platform: "vimeo", videoId: "1210625326", gradient: COMMERCIAL_GRADIENTS[5] },
  { title: "Yeast Protein Powder — Couple Film", client: "Yoga Bar", category: "Commercial", platform: "vimeo", videoId: "1210625327", gradient: COMMERCIAL_GRADIENTS[5] },
  { title: "Jain University Commercial", client: "Jain University", category: "Commercial", platform: "vimeo", videoId: "723358422", gradient: COMMERCIAL_GRADIENTS[6] },
  { title: "Leak Proof Jars", client: "Independent", category: "Commercial", platform: "vimeo", videoId: "827589115", gradient: COMMERCIAL_GRADIENTS[7] },
  { title: "Blade Efficiency", client: "Independent", category: "Commercial", platform: "vimeo", videoId: "897393519", gradient: COMMERCIAL_GRADIENTS[8] },
  { title: "Bytescare — Spot 1", client: "Bytescare", category: "Commercial", platform: "vimeo", videoId: "897393995", gradient: COMMERCIAL_GRADIENTS[9] },
  { title: "Writing Academy Advertisement", client: "Writing Academy", category: "Commercial", platform: "vimeo", videoId: "937043032", gradient: COMMERCIAL_GRADIENTS[10] },
  { title: "Love Served Hot — Smart Cooking", client: "Philips Airfryer", category: "Commercial", platform: "youtube", videoId: "1z98ssEbzi8", gradient: COMMERCIAL_GRADIENTS[1] },
  { title: "Perfect Taste, Endless Possibilities", client: "Philips Airfryer", category: "Commercial", platform: "youtube", videoId: "OQGgzz4bHC4", gradient: COMMERCIAL_GRADIENTS[1] },
  { title: "VF1 Smart Washing Machine", client: "Panasonic", category: "Commercial", platform: "youtube", videoId: "QvmbWqX56zI", gradient: COMMERCIAL_GRADIENTS[7] },
  { title: "4K TV — Ultra HD Clarity", client: "Panasonic", category: "Commercial", platform: "youtube", videoId: "eBcrGg3iN3M", gradient: COMMERCIAL_GRADIENTS[7] },
  { title: "Knowledge Series — Commander REAR", client: "BKT Tyres", category: "Commercial", platform: "youtube", videoId: "5A4wbWN_-dA", gradient: COMMERCIAL_GRADIENTS[6] },
  { title: "Knowledge Series — Agri Commander Radial", client: "BKT Tyres", category: "Commercial", platform: "youtube", videoId: "N0lUyRS_Y6U", gradient: COMMERCIAL_GRADIENTS[6] },
  { title: "HH Language Academy", client: "Henry Harvin", category: "Commercial", platform: "youtube", videoId: "JvVXeK4HBz4", gradient: COMMERCIAL_GRADIENTS[11] },
  { title: "TradeIndia — Father's Day Film", client: "TradeIndia", category: "Commercial", platform: "youtube", videoId: "KKcPusaZ8tY", gradient: COMMERCIAL_GRADIENTS[11] },
  { title: "Chetan Bhagat vs Inspector Chetan Bhagat", client: "Henry Harvin", category: "Commercial", platform: "youtube", videoId: "NMu0VQwtZOs", gradient: COMMERCIAL_GRADIENTS[11] },

  // Behind the Scenes
  { title: "Ad Film Shoot — Katdare Taak Masala", client: "Katdare Taak Masala", category: "Behind the Scenes", platform: "vimeo", videoId: "723355545", gradient: BTS_GRADIENTS[0] },
  { title: "Behind the Scenes — Miles Education", client: "Miles Education", category: "Behind the Scenes", platform: "vimeo", videoId: "723357777", gradient: BTS_GRADIENTS[1] },
  { title: "Jain TVC — Behind the Scenes", client: "Jain University", category: "Behind the Scenes", platform: "vimeo", videoId: "723358800", gradient: BTS_GRADIENTS[2] },
  { title: "Philips — Behind the Scenes", client: "Philips", category: "Behind the Scenes", platform: "vimeo", videoId: "897402886", gradient: BTS_GRADIENTS[0] },
  { title: "Rosa — Behind the Scenes", client: "Rosa", category: "Behind the Scenes", platform: "vimeo", videoId: "897403204", gradient: BTS_GRADIENTS[1] },
  { title: "Making of TradeIndia Father's Day", client: "TradeIndia", category: "Behind the Scenes", platform: "youtube", videoId: "lbWgj5AkCuM", gradient: BTS_GRADIENTS[2] },
];

export const clients = [
  "Ministry of Information & Broadcasting",
  "Philips",
  "Panasonic",
  "Amazon",
  "KFC",
  "Usha",
  "Toshiba",
  "BKT Tyres",
  "MakeMyTrip",
  "Yoga Bar",
  "Henry Harvin",
  "Jain University",
  "TradeIndia",
  "Bytescare",
];

export const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "150M+", label: "Views Collectively" },
  { value: `${clients.length}+`, label: "Brands Worked With" },
  { value: "4", label: "Formats — Ads, Fiction, Corporate, Docs" },
];
