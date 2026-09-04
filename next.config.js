/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
    serverComponentsExternalPackages: ['firebase-admin'],
  },
};

module.exports = nextConfig;
