import { use } from 'react';
import { getSettings } from '@/lib/api.server';
import type { Metadata } from '@/lib/types';

interface SEOProps {
  title?: string;
  description?: string;
  metadata?: Metadata[];
}

const ogImage = 'https://frontend.cafe/logo-square.png';

const DEFAULT_DESCRIPTION =
  'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.';

const SEO: React.FC<SEOProps> = ({ title, description, metadata = [] }) => {
  const settings = use(getSettings());

  const hasMetadataTitle = metadata.some(
    (meta) => meta.property === 'og:title',
  );

  const hasMetadataDescription = metadata.some(
    (meta) => meta.property === 'og:description',
  );

  const hasMetadataImage = metadata.some(
    (meta) => meta.property === 'og:image',
  );

  return (
    <>
      <title>{title ? `${title} - FrontendCafé` : 'FrontendCafé'}</title>
      <meta
        name="description"
        content={description ?? settings.description ?? DEFAULT_DESCRIPTION}
      />
      {/* Open Graph */}
      {!hasMetadataTitle && (
        <meta property="og:title" content={`${title} - FrontendCafé `} />
      )}

      {!hasMetadataDescription && (
        <meta property="og:description" content={description} />
      )}

      {!hasMetadataImage && <meta property="og:image" content={ogImage} />}

      {metadata.map((meta) => (
        <meta key={meta._key} property={meta.property} content={meta.content} />
      ))}
    </>
  );
};

export default SEO;
