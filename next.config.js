/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.discordapp.com',
        protocol: 'https',
      },
      {
        hostname: 'pbs.twimg.com',
        protocol: 'https',
      },
      {
        hostname: 'cdn.sanity.io',
        protocol: 'https',
      },
      {
        hostname: 'flagcdn.com',
        protocol: 'https',
      },
    ],
  },
  experimental: {},
  swcMinify: true,
};
