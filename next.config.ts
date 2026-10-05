import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // V2 §10 — serve AVIF/WebP with responsive `sizes`
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
