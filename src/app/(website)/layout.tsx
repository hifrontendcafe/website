import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PreviewBanner from '@/components/PreviewBanner';
import Providers from '@/components/Providers';
import fontVariables from '@/lib/font-variables';
import { getSettings } from '@/lib/sanity/settings/getSettings';
import { getMetadata } from '@/lib/seo';
import clsx from 'clsx';
import { draftMode } from 'next/headers';

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
  const settings = await getSettings({
    next: {
      revalidate: 120,
    },
  });

  const { isEnabled } = draftMode();

  return (
    <html lang="es" className={clsx(fontVariables, 'scroll-smooth')}>
      <head />
      <body className="min-h-screen w-full bg-zinc-900 font-sans text-primary">
        <Providers>
          <div className="absolute left-1/2 -z-10 h-3/5 w-7/12 -translate-x-1/2 -translate-y-1/3 rounded-[50%] bg-gradient-to-b from-ellipseGreen via-ellipseGreen to-transparent opacity-70 blur-4xl" />
          <PreviewBanner />
          <Header
            logo={settings.logo}
            navItems={settings.navItems}
            preview={isEnabled}
          />
          <div className="container mx-auto pt-12" id="container">
            {children}
          </div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
