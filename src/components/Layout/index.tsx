import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';
import { Image } from '../../lib/types';

type LayoutProps = {
  mode?: 'main' | 'simple';
  title?: string;
  description?: string;
  preview?: boolean;
  menu?: Array<string>;
  logo?: Image;
};

type LayoutPreviewProps = {
  preview?: boolean;
  menu?: Array<string>;
  logo?: Image;
};

const MainLayout: React.FC<LayoutPreviewProps> = ({
  preview,
  children,
  menu,
  logo,
}) => (
  <div className="antialiased">
    {preview && <PreviewBanner />}
    <Header logo={logo} menu={menu} preview={preview} />
    {children}
    <Footer />
  </div>
);

const SimpleLayout: React.FC<LayoutPreviewProps> = ({ preview, children }) => (
  <div className="antialiased">
    {preview && <PreviewBanner />}
    {children}
  </div>
);

const Layout: React.FC<LayoutProps> = ({
  mode = 'main',
  title,
  description,
  preview = false,
  children,
  menu,
  logo,
}) => {
  return (
    <>
      <FecHead title={title} description={description} />
      {
        {
          main: (
            <MainLayout logo={logo} menu={menu} preview={preview}>
              {children}
            </MainLayout>
          ),
          simple: <SimpleLayout preview={preview}>{children}</SimpleLayout>,
        }[mode]
      }
    </>
  );
};

export default Layout;
