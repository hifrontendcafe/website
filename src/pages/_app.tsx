import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/calendar.css';
import '../styles/menu.css';
import '../styles/scrollbar.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
