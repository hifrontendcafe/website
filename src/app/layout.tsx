import { Lexend_Deca, Rubik } from 'next/font/google';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { getSettings } from '@/lib/api.server';
import clsx from 'clsx';
import { previewData } from 'next/headers';
import PreviewBanner from '@/components/PreviewBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMetadata } from '@/lib/seo';
import Analytics from '@/components/Analytics';
import Providers from '@/components/Providers';

const lexend = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

export const generateMetadata = () =>
  getMetadata({
    title: {
      default: 'FrontendCafé',
      template: '%s - FrontendCafé',
    },
  });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings({ next: { revalidate: 120 } });

  const preview = !!previewData();

  return (
    <html lang="es" className={clsx(rubik.variable, lexend.variable)}>
      <head />
      <body>
        <Providers>
          <div className="w-full min-h-screen bg-zinc-900">
            <div className="absolute w-7/12 -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-ellipseGreen via-ellipseGreen to-transparent left-1/2 h-3/5 ellipse blur-4xl opacity-70" />

            <div className="z-10">
              <PreviewBanner />

              <Header
                logo={settings.logo}
                navItems={settings.navItems}
                preview={preview}
              />

              <div
                id="container"
                className="container relative z-20 pt-12 mx-auto"
              >
                {children}
              </div>
              {/* @ts-expect-error Server Component */}
              <Footer />
            </div>
          </div>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
