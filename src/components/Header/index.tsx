import { imageBuilder } from '../../lib/sanity';
import { useSettings } from '@/lib/settings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Navbar from '@/components/Navbar';
import { useZeroScrollY } from './useScroll';
import { useMenuToggle } from './useMenuToggle';

type HeaderProps = {
  preview: boolean;
};

const Header: React.FC<HeaderProps> = ({ preview }) => {
  const { logo, menu } = useSettings();
  const isAtTop = useZeroScrollY();
  const [isOpen, toggle] = useMenuToggle(false);

  const isClosed = !isOpen;

  const logoImg = imageBuilder.image(logo).url();
  const router = useRouter();
  const [session, loading] = useSession();

  const navItems = menu?.map((item) => {
    const split = item.indexOf('/');
    return { title: item.substring(0, split), link: item.substring(split) };
  });

  return (
    <header
      className={`w-full flex flex-col sticky top-0 z-50 transition duration-300 ${
        preview ? 'pt-10' : ''
      } ${isAtTop && isClosed ? '' : 'nav-scroll'}`}
    >
      <Navbar
        logoImg={logoImg}
        user={session?.user}
        pathname={router.pathname}
        navItems={navItems}
        loading={loading}
        isOpen={isOpen}
        toggle={toggle}
      />
    </header>
  );
};

export default Header;
