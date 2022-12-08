import { Metadata } from '@/lib/types';
import Head from 'next/head';

interface FecHeadProps {
  title: string;
  description?: string;
  metadata?: Metadata[];
}

const ogImage = 'https://frontend.cafe/logo-square.png';

const FecHead: React.FC<FecHeadProps> = ({
  title = 'FrontendCafé ',
  description = 'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.',
  metadata = [],
}) => {
  const hasMetadataTitle =
    metadata.findIndex((meta) => meta.property === 'og:title') !== -1;
  const hasMetadataDescription =
    metadata.findIndex((meta) => meta.property === 'og:description') !== -1;
  const hasMetadataImage =
    metadata.findIndex((meta) => meta.property === 'og:image') !== -1;
  return (
    <Head>
      <title>{title} - FrontendCafé </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      {/* Open Graph */}
      {!hasMetadataTitle && (
        <meta property="og:title" content={`${title} - FrontendCafé `} />
      )}
      {!hasMetadataDescription && (
        <meta property="og:description" content={description} />
      )}
      {!hasMetadataImage && <meta property="og:image" content={ogImage} />}
      {metadata.map((meta: Metadata) => (
        <meta key={meta._key} property={meta.property} content={meta.content} />
      ))}
    </Head>
  );
};

export default FecHead;
