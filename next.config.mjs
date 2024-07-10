/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "internal-api-drive-stream-sg.larksuite.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
