// import { withImages } from 'next-images';
const dotenv = require('dotenv');
dotenv.config()
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_HOST_NAME,
        port: process.env.NEXT_PUBLIC_PORT,
      },
    ],
  },
};

module.exports = nextConfig;
