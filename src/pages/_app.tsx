import { useRef } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/calendar.css';
import '../styles/menu.css';
import '../styles/scrollbar.css';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
