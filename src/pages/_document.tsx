import { Head, Html, Main, NextScript } from 'next/document';

import { lexend, rubik } from './_app';

export default function Document() {
  return (
    <Html className={`${lexend.variable} ${rubik.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
