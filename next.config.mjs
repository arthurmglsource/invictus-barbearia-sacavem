/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep production builds from overwriting a running development server.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
  },
};

export default nextConfig;
