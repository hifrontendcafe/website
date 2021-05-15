import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

interface FecHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
}

const FecHead: React.FC<FecHeadProps> = ({
  title = 'FrontendCafé',
  description = '',
  ogImage = 'https://frontend.cafe/logo-square.png',
}) => {
  const { t } = useTranslation('common');

  return (
    <Head>
      <title>{title} - FrontendCafé </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description ?? t('meta.description')} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} - FrontendCafé `} />
      <meta
        name="twitter:description"
        content={description ?? t('meta.description')}
      />
      <meta name="twitter:site" content="@frontendcafe" />
      <meta name="twitter:image" content={ogImage} />
      {/* Open Graph */}
      <meta property="og:title" content={`${title} - FrontendCafé `} />
      <meta
        property="og:description"
        content={description ?? t('meta.description')}
      />
      <meta property="og:image" content={ogImage} />
      {/* Imports */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default FecHead;
