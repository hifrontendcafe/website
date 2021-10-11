import { imageBuilder } from '../../lib/sanity';
import { useSettings } from '@/lib/settings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Navbar from '@/components/Navbar';

type HeaderProps = {
  preview: boolean;
};

const Header: React.FC<HeaderProps> = ({ preview }) => {
  const { logo, menu } = useSettings();

  const logoImg = imageBuilder.image(logo).url();
  const router = useRouter();
  const [session, loading] = useSession();

  const navItems = menu?.map((item) => {
    const [title, link] = item.split('/');
    return { title, link };
  });

  return (
    <header
      className={`w-full flex flex-col sticky top-0 z-50 ${
        preview ? 'pt-10' : ''
      }`}
    >
      <Navbar
        logoImg={logoImg}
        user={session?.user}
        pathname={router.pathname}
        navItems={navItems}
        loading={loading}
      />
    </header>
  );
};

export default Header;
