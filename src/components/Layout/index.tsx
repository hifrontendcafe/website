import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';

interface LayoutProps {
  preview?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ preview = false, children }) => {
  return (
    <>
      <Head>
        <title>FRONTENDCAFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
