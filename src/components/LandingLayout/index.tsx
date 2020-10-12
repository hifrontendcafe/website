import Head from 'next/head';
import Navbar from '../LandingNavbar';
import Footer from '../LandingFooter';

interface LandingLayoutProps {
  title?: string;
  transparent?: boolean;
}

const Layout: React.FC<LandingLayoutProps> = ({
  title,
  transparent,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar transparent={true} />
      </header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
