import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thesis-gamestopre.nyc3.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost", // Allow localhost for development
        port: "3000", // Include the port if applicable (default is 3000 for local Next.js)
        pathname: "/**", // Match your API's path for images
      },
    ],
  },
};

export default nextConfig;