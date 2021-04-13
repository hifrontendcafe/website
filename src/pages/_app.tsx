import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/calendar.css';
import '../styles/menu.css';
import '../styles/scrollbar.css';

import { AppWrapper } from '../lib/settings';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default MyApp;
