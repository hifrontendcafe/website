module.exports = {
  experimental: {
    optimizeFonts: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/calendar',
      },
    ]
  },
};
