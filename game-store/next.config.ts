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
  async rewrites() {
    return [
      {
        source: "/api/add_product",
        destination: "http://127.0.0.1:8000/add_product",
      },
      {
        source: "/api/upload",
        destination: "http://127.0.0.1:8000/upload_image",
      },
      {
        source: "/api/users",
        destination: "http://127.0.0.1:8000/users",
      },
      {
        source: "/api/add_order",
        destination: "http://127.0.0.1:8000/add_order",
      },
    ]
  },
};

export default nextConfig;