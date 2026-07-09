export type Project = {
  title: string;
  category: string;
  client: string;
  gradient: string;
};

export const projects: Project[] = [
  { title: "The Big Billion Sale", category: "Commercial", client: "Flipkart", gradient: "from-yellow-500 via-orange-600 to-red-700" },
  { title: "Stream the Story", category: "Brand Film", client: "Prime Video", gradient: "from-sky-600 via-indigo-700 to-slate-900" },
  { title: "10 Minute City", category: "Commercial", client: "Blinkit", gradient: "from-emerald-500 via-lime-600 to-yellow-600" },
  { title: "Finger Lickin' Frames", category: "Commercial", client: "KFC", gradient: "from-red-600 via-red-700 to-neutral-900" },
  { title: "Shave Different", category: "Brand Film", client: "Philips", gradient: "from-cyan-500 via-blue-700 to-indigo-900" },
  { title: "Sound of Silence", category: "Documentary", client: "Panasonic", gradient: "from-purple-600 via-fuchsia-700 to-pink-800" },
  { title: "Homecoming", category: "Fiction", client: "Independent", gradient: "from-amber-600 via-rose-700 to-neutral-900" },
  { title: "Corner Office", category: "Corporate", client: "Toshiba", gradient: "from-slate-600 via-slate-800 to-black" },
  { title: "Festival of Lights", category: "Commercial", client: "Amazon", gradient: "from-orange-500 via-amber-600 to-yellow-700" },
  { title: "Paper Trail", category: "Documentary", client: "Independent", gradient: "from-teal-600 via-cyan-800 to-neutral-900" },
  { title: "First Frame", category: "Fiction", client: "Independent", gradient: "from-rose-600 via-red-800 to-neutral-900" },
  { title: "Delivered.", category: "Commercial", client: "Blinkit", gradient: "from-lime-500 via-green-700 to-emerald-900" },
];

export const clients = [
  "Amazon",
  "Prime Video",
  "Flipkart",
  "Blinkit",
  "KFC",
  "Philips",
  "Panasonic",
  "Toshiba",
];

export const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "150M+", label: "Views Collectively" },
  { value: "30+", label: "Brands Worked With" },
  { value: "4", label: "Formats — Ads, Fiction, Corporate, Docs" },
];
