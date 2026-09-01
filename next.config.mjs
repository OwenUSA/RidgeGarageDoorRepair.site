/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [] }, // D-18: everything local, no image CDN
};
export default nextConfig;
