import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';
import { ReactElement } from 'react';

interface LayoutProps {
  mode?: 'main' | 'simple';
  title?: string;
  description?: string;
  preview?: boolean;
}

const MainLayout: React.FC = ({
  preview,
  children,
}: {
  preview: boolean;
  children: ReactElement;
}) => (
  <div className="antialiased">
    {preview && <PreviewBanner />}
    <Header preview={preview} />
    {children}
    <Footer />
  </div>
);

const SimpleLayout: React.FC = ({
  preview,
  children,
}: {
  preview: boolean;
  children: ReactElement;
}) => <div className="antialiased">{children}</div>;

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
          main: <MainLayout>{children}</MainLayout>,
          simple: <SimpleLayout>{children}</SimpleLayout>,
        }[mode]
      }
    </>
  );
};

export default Layout;
