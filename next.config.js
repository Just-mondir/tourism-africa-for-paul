/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Optimisation pour les images Cloudinary
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;

