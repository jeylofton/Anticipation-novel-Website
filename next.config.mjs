/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve images directly as static files instead of through Next's
    // on-server optimizer (/_next/image). The optimizer needs sharp + memory
    // and fails on some self-hosted environments (e.g. Hostinger), which
    // 404s every image. Our images are already compressed, so we don't need it.
    unoptimized: true,
  },
};

export default nextConfig;
