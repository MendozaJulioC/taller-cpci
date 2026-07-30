/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net',
      },
    ],
  },
};

export default nextConfig;