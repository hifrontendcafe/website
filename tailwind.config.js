module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    minHeight: {
      '64': '64px',
      'full': '100%',
      'screen': '100vh',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#00c39d',
      primarydark: '#00987a',
      secondary: '#667eea',
      secondarydark: '#3b4c99',
      thirdiary: '#d53f8c',
      thirdiarydark: '#9d2e67',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      primary: '#00c39d',
      primarydark: '#00987a',
      secondary: '#667eea',
      secondarydark: '#3b4c99',
      thirdiary: '#d53f8c',
      thirdiarydark: '#9d2e67',
    }),
  },
  variants: {},
  plugins: [],
};
