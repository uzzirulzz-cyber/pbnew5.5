/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.playbeat.digital', 'ui-avatars.com'],
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
  },
}

module.exports = nextConfig
