/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '',
  // useFileSystemPublicRoutes: false,
  images: {
    // domains: ['127.0.0.1', 'api.billettic.seedtransfert.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.letrans-porteur.com',
        pathname: '/storage/**',
        // port: '',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/storage/**',
        // port: '',
      },
    ],
  }
}

module.exports = nextConfig
