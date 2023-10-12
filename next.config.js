/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0, // cache size in bytes
  },
};

module.exports = nextConfig;
