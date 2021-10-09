import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';

type LayoutProps = {
  mode?: 'main' | 'simple';
  title?: string;
  description?: string;
  ogImage?: string;
  preview?: boolean;
};

type LayoutPreviewProps = {
  preview?: boolean;
};

const MainLayout: React.FC<LayoutPreviewProps> = ({ preview, children }) => (
  <div style={{ backgroundColor: '#0D071A' }} className="w-full">
    <div className="absolute w-3/4 transform -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-ellipseBlue via-ellipseBlue to-transparent left-1/2 h-3/5 ellipse filter blur-3xl opacity-70"></div>
    <div className="z-10">
      {preview && <PreviewBanner />}
      <Header preview={preview} />
      {children}
      <Footer />
    </div>
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
  ogImage,
  preview = false,
  children,
}) => {
  const SelectedLayout = mode === 'simple' ? SimpleLayout : MainLayout;

  return (
    <>
      <FecHead title={title} description={description} ogImage={ogImage} />
      <SelectedLayout preview={preview}>{children}</SelectedLayout>
    </>
  );
};

export default Layout;
