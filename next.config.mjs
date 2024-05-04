// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "geeleedwinwin.s3.amazonaws.com",
//       "geeleedwinwin.s3.ap-southeast-2.amazonaws.com",
//     ],
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: [
      "geeleedwinwin.s3.amazonaws.com",
      "geeleedwinwin.s3.ap-southeast-2.amazonaws.com",
    ],
  },
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options
})(nextConfig);
