import { useRef } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/menu.css';
import '../styles/scrollbar.css';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { AppWrapper } from '../lib/settings';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
