const defaultTheme = require('tailwindcss/defaultTheme');
const colors = {
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
};

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
    letterSpacing: {
      tight: '-0.125em',
    },
    screens: Object.fromEntries(
      Object.entries(defaultTheme.screens).filter(([key]) => key !== '2xl'),
    ),
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    minHeight: {
      64: '64px',
      full: '100%',
      screen: '100vh',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#6366F1',
      primarydark: '#7300B0',
      secondary: '#667eea',
      secondarydark: '#3b4c99',
      tertiary: '#d53f8c',
      tertiarydark: '#9d2e67',
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
          ...colors.gray,
        },
        ellipseBlue: '#142A4A',
        profileRing: '#00C39D',
        violet: '#6366F1',
        darkViolet: '#3336A3',
        testblue: '#0089C4',
        greenFec: '#00C39D',
      },
      textColor: {
        primary: colors.gray[50],
        secondary: colors.gray[300],
        tertiary: colors.gray[200],
        accent: '#6366F1',
        informational: '#4991DA',
        lightBlue: '#00CCFF',
        darkBlue: '#0066CC',
        hover: '#2469FF',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
