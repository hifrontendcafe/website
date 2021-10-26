import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';

import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

import { useEffect } from 'react';
import gaService from '@/lib/gtag';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { SettingsProvider } from '@/lib/settings';

function handleAcceptCookie() {
  gaService.initGA();
}

function handleRouteChange(url: URL) {
  gaService.pageView(url);
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === 'true') {
      handleAcceptCookie();
    }
  }, []);

  useEffect(() => {
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
          containerClasses="fixed mb-4 left-0 right-0 bottom-4 flex text-coolGray-50 justify-between px-4 py-2 items-center bg-coolGray-600 z-20 container mx-auto rounded-md"
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
