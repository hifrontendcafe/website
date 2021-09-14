import { useRef } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/menu.css';
import '../styles/scrollbar.css';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { AppWrapper } from '../lib/settings';
import { Provider } from 'next-auth/client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@/lib/gtag';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

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
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
