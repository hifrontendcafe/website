import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { SettingsProvider } from '@/lib/settings';

import { Lexend_Deca, Rubik } from '@next/font/google';
import Analytics from '@/components/Analytics';

export const lexend = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <SettingsProvider settings={pageProps.settings}>
        <Component {...pageProps} />

        <Analytics />
      </SettingsProvider>
    </Provider>
  );
};

export default MyApp;
