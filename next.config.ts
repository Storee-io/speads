import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@tabler/icons-react"],
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER],
        },
      },
      resolveAlias: {
        '@formatjs/fast-memoize': '@formatjs/fast-memoize',
      },
    },
  },
  transpilePackages: ['@formatjs/intl-localematcher', '@formatjs/fast-memoize'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
// Orchids restart: 1767432577830
