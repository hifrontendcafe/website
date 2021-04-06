import Head from 'next/head';

interface FecHeadProps {
  title: string;
  description?: string;
}

const FecHead: React.FC<FecHeadProps> = ({
  title = 'FrontendCafé ',
  description = 'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.',
  children,
}) => {
  return (
    <Head>
      <title>{title} - FrontendCafé </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} - FrontendCafé `} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@frontendcafe" />
      <meta
        name="twitter:image"
        content="https://frontend.cafe/logo-square.png"
      />
      {/* Open Graph */}
      <meta property="og:title" content={`${title} - FrontendCafé `} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://frontend.cafe/logo-square.png"
      />
      {/* Imports */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default FecHead;
