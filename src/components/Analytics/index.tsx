import Script from 'next/script';

import CookieConsent from './CookieConsent';
import VercelAnalytics from './Vercel';

function Clarity() {
  // if (process.env.NODE_ENV !== 'production') {
  //   return null;
  // }

  if (!process.env.CLARITY_PROJECT_ID) {
    return null;
  }

  return (
    <Script
      id="clarity"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.CLARITY_PROJECT_ID}");`,
      }}
    />
  );
}

export default function Analytics() {
  return (
    <>
      <CookieConsent />
      <Clarity />
      <VercelAnalytics />
    </>
  );
}
