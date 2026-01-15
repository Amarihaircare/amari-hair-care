/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amari-hair-care.zohocommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'amariscalpcare.zohoecommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.zohoecommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'books.zoho.com',
        pathname: '/api/v3/items/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Added Pexels domain
      },
    ],
  },
};

export default nextConfig;
