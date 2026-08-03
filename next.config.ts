import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ["mongodb"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "vumbnail.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
