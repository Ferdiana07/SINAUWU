import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide Vercel branding
  poweredByHeader: false,

  // Compression
  compress: true,

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
