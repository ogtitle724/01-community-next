/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    logging: "verbose",
  },
  images: {
    domains: ["clipmarket.s3.ap-northeast-2.amazonaws.com"],
  },
  /* experimental: {
    logging: {
      level: 'verbose'
    }
  } */
};

module.exports = nextConfig;
