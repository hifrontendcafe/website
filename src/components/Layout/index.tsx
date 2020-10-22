import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';

interface LayoutProps {
  title: string;
  description: string;
  preview?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  preview = false,
  children,
  title = 'FrontEndCafé',
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title} - FrontEndCafé</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        {/* Twitter */}
        <meta name="twitter:title" content={`${title} - FrontEndCafé`} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://frontend.cafe/logo-square.png"
        />
        {/* Open Graph */}
        <meta property="og:title" content={`${title} - FrontEndCafé`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://frontend.cafe/logo-square.png"
        />
        {/* Imports */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700"
        />
      </Head>
      <div className="antialiased">
        {preview && <PreviewBanner />}
        <Header preview={preview} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
