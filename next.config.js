/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for GitHub Pages
  basePath: '/Next-Toolit', // Your repository name
  assetPrefix: '/Next-Toolit/', // Prefix for all assets
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
