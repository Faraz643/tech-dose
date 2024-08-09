/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_FIREBASE_HOST_NAME,
      },
      {
        hostname: process.env.NEXT_PUBLIC_LOCAL_HOST_NAME
      }
    ],
  },
};

module.exports = nextConfig;
