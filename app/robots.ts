import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** noindex while in demo mode — a demo should not be indexed (protects the client's future domain). */
export default function robots(): MetadataRoute.Robots {
  if (site.demoMode) return { rules: { userAgent: "*", disallow: "/" } };
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
