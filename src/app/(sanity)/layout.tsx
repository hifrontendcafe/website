import '@/styles/index.css';
import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio/metadata';

export const metadata: Metadata = {
  ...studioMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
