const defaultTheme = require('tailwindcss/defaultTheme');

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
    screens: Object.fromEntries(
      Object.entries(defaultTheme.screens).filter(([key]) => key !== '2xl'),
    ),
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      padding: '2rem',
    },
    minHeight: {
      64: '64px',
      full: '100%',
      screen: '100vh',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#8C00D7',
      primarydark: '#7300B0',
      secondary: '#667eea',
      secondarydark: '#3b4c99',
      tertiary: '#d53f8c',
      tertiarydark: '#9d2e67',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      primary: '#00DDFF',
      primarydark: '#7300B0',
      secondary: '#667eea',
      secondarydark: '#3b4c99',
      tertiary: '#d53f8c',
      tertiarydark: '#9d2e67',
      informational: '#4991DA',
    }),
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        highlighted: '100px',
      },
      colors: {
        gray: {
          50: '#F9F9FA',
          100: '#DEDEDF',
          200: '#BDBDBF',
          300: '#9C9C9F',
          400: '#808084',
          500: '#414144',
          600: '#323235',
          700: '#232326',
          800: '#19191C',
          900: '#08080A',
        },
        ellipseBlue: '#142A4A',
        profileRing: '#00DDFF',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
