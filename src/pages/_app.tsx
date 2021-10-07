import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { SettingsProvider } from '@/lib/settings';

import * as gtag from '@/lib/gtag';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <SettingsProvider settings={pageProps.settings}>
        <Component {...pageProps} />
      </SettingsProvider>
    </Provider>
  );
};

export default MyApp;
