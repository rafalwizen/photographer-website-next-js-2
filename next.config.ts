import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Pin Turbopack workspace root to this project; without it Next may infer
    // a parent directory (e.g. when a stray lockfile exists there) and watch
    // unrelated projects, exhausting system memory in dev mode.
    turbopack: {
        root: __dirname,
    },
};

export default nextConfig;
