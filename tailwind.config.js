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
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#00C39D',
      primarydark: '#00604E',
      secondary: '#7289da',
      secondarydark: '#5466a5',
    }),
  },
  variants: {},
  plugins: [],
};
