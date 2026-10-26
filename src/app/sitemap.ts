import type { MetadataRoute } from "next"

// Required for static export (output: 'export')
export const dynamic = "force-static"

// Single-page site: one canonical URL.
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://rozbickipawel.pl/",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ]
}
