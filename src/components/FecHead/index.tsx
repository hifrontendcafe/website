import { Metadata } from '@/lib/types';
import Head from 'next/head';

interface FecHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
  metadata: Metadata[];
}

const FecHead: React.FC<FecHeadProps> = ({
  title = 'FrontendCafé ',
  description = 'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.',
  ogImage = 'https://frontend.cafe/logo-square.png',
  metadata = [],
}) => {
  return (
    <Head>
      <title>{title} - FrontendCafé </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      {/* Open Graph */}
      {metadata.findIndex((meta) => meta.property === 'og:title') === -1 && (
        <meta property="og:title" content={`${title} - FrontendCafé `} />
      )}
      {metadata.findIndex((meta) => meta.property === 'og:description') ===
        -1 && <meta property="og:description" content={description} />}
      {metadata.findIndex((meta) => meta.property === 'og:image') === -1 && (
        <meta property="og:image" content={ogImage} />
      )}
      {metadata.map((meta: Metadata) => (
        <meta key={meta._key} property={meta.property} content={meta.content} />
      ))}
      {/* Imports */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default FecHead;
