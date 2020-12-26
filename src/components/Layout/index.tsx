import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';

type LayoutProps = {
  mode?: 'main' | 'simple';
  title?: string;
  description?: string;
  preview?: boolean;
};

type LayoutPreviewProps = {
  preview?: boolean;
};

const MainLayout: React.FC<LayoutPreviewProps> = ({ preview, children }) => (
  <div className="antialiased">
    {preview && <PreviewBanner />}
    <Header preview={preview} />
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
}) => {
  return (
    <>
      <FecHead title={title} description={description} />
      {
        {
          main: <MainLayout preview={preview}>{children}</MainLayout>,
          simple: <SimpleLayout preview={preview}>{children}</SimpleLayout>,
        }[mode]
      }
    </>
  );
};

export default Layout;
