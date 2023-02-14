'use client';
import ReactCookieConsent from 'react-cookie-consent';

export default function CookieConsent() {
  // const handleAcceptCookie = () => gaService.initGA();

  // useEffect(() => {
  //   const isConsent = getCookieConsentValue();

  //   if (isConsent === 'true') {
  //     handleAcceptCookie();
  //   }
  // }, []);

  return (
    <ReactCookieConsent
      disableStyles
      containerClasses="fixed mb-4 left-0 right-0 bottom-4 flex text-primary justify-between px-4 py-2 items-center bg-zinc-700 z-20 container mx-auto rounded-md"
      buttonText="Aceptar"
      buttonClasses="btn btn-primary rounded-lg"
      // onAccept={handleAcceptCookie}
    >
      Este sitio usa cookies para mejorar la experiencia de usuario.
    </ReactCookieConsent>
  );
}
