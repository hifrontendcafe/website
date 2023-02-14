/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: [
      'cdn.discordapp.com',
      'pbs.twimg.com',
      'cdn.sanity.io',
      'flagcdn.com',
    ],
  },
  experimental: {
    appDir: true,
  },
  swcMinify: true,
};
