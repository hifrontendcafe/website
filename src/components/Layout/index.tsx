import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';
import { Settings } from '../../lib/types';

type LayoutProps = {
  mode?: 'main' | 'simple';
  title?: string;
  description?: string;
  preview?: boolean;
  settings?: Settings;
};

type LayoutPreviewProps = {
  preview?: boolean;
  settings?: Settings;
};

const MainLayout: React.FC<LayoutPreviewProps> = ({
  preview,
  children,
  settings,
}) => (
  <div className="antialiased">
    {preview && <PreviewBanner />}
    <Header logo={settings.logo} menu={settings.menu} preview={preview} />
    {children}
    <Footer socialnetworks={settings.socialnetworks} />
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
  settings,
}) => {
  return (
    <>
      <FecHead title={title} description={description} />
      {
        {
          main: (
            <MainLayout settings={settings} preview={preview}>
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
