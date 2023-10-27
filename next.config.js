/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    logging: "verbose",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /* experimental: {
    logging: {
      level: 'verbose'
    }
  } */
};

module.exports = nextConfig;
