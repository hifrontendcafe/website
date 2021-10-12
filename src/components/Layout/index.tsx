import Header from '../Header';
import Footer from '../Footer';
import PreviewBanner from '../PreviewBanner';
import FecHead from '../FecHead';

type LayoutProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  preview?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  ogImage,
  preview = false,
  children,
}) => {
  // asdfkjhlsdfkhjkjhsdfkjhsdf
  return (
    <>
      <FecHead title={title} description={description} ogImage={ogImage} />
      <div className="w-full bg-gray-900">
        <div className="absolute w-3/4 transform -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-ellipseBlue via-ellipseBlue to-transparent left-1/2 h-3/5 ellipse filter blur-3xl opacity-70"></div>
        <div className="z-10">
          {preview && <PreviewBanner />}
          <Header preview={preview} />
          <div id="container" className="container relative z-20 mx-auto">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
