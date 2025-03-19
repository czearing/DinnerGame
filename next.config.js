const withPWA = require("next-pwa")({
  dest: "public",
  // Comment this out temporarily to test
  // disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
