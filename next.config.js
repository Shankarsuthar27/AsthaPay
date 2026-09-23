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
  async redirects() {
    return [
      {
        source: '/irctc',
        destination: '/become-an-irctc-agent',
        permanent: true,
      },
      {
        source: '/irctc-agent',
        destination: '/become-an-irctc-agent',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
