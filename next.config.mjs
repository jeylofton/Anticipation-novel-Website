/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint isn't a build gate here; skip it so an ESLint 9 / flat-config
  // mismatch can't fail the production build.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Serve images directly as static files instead of through Next's
    // on-server optimizer (/_next/image). The optimizer needs sharp + memory
    // and fails on some self-hosted environments (e.g. Hostinger), which
    // 404s every image. Our images are already compressed, so we don't need it.
    unoptimized: true,
  },
};

export default nextConfig;
