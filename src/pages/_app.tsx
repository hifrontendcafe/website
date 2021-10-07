import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';

import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from 'react-cookie-consent';

import { useEffect } from 'react';
import gaService from '@/lib/gtag';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { SettingsProvider } from '@/lib/settings';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const handleAcceptCookie = () => {
    gaService.initGA();
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === 'true') {
      handleAcceptCookie();
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gaService.pageView(url);
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
        <CookieConsent
          disableStyles
          containerClasses="fixed mb-4 left-0 right-0 bottom-4 flex text-white justify-between px-4 py-2 items-center bg-gray-600 z-2 container mx-auto rounded-md"
          buttonText="Aceptar"
          buttonClasses="btn btn-primary rounded-lg"
          onAccept={handleAcceptCookie}
        >
          Este sitio usa cookies para mejorar la experiencia de usuario.
        </CookieConsent>
      </SettingsProvider>
    </Provider>
  );
};

export default MyApp;
