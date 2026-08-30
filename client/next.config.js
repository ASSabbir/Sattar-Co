/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // required for static export — you're not using next/image anyway
  },
};

module.exports = nextConfig;