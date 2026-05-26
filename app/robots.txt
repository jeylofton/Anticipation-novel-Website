const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anticipationnovel.com";

// Next.js generates /robots.txt from this.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
