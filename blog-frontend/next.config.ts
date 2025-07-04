import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http'
        hostname: "your-backend-or-cdn-domain.com", // **IMPORTANT: Replace this with your actual domain**
        port: "",
        pathname: "/**", // Allow any path from this domain
      },
      // You can add more domains here if needed
      // For example, if you use Unsplash for placeholders:
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },
};

export default nextConfig;
