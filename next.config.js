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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/mentorias',
          has: [{ type: 'query', key: 'especialidad' }],
          destination: '/mentorias/:especialidad',
        },
      ],
    };
  },
  experimental: {
    appDir: true,
  },
  swcMinify: true,
};
