'use client';

import ReactCookieConsent from 'react-cookie-consent';

export default function CookieConsent() {
  return (
    <ReactCookieConsent
      disableStyles
      containerClasses="fixed inset-x-0 bottom-4 z-20 md:mx-auto mx-2 mb-4 flex gap-4 max-w-prose items-center justify-between rounded-md bg-zinc-700 px-4 py-2"
      buttonText="Aceptar"
      buttonClasses="btn btn-primary"
      // onAccept={handleAcceptCookie}
    >
      Este sitio usa cookies para mejorar la experiencia de usuario.
    </ReactCookieConsent>
  );
}
