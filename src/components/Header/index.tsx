'use client';

import { imageBuilder } from '../../lib/sanity';
import { useSettings } from '@/lib/settings';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/client';
import Navbar from '@/components/Navbar';
import { useZeroScrollY } from './useScroll';
import { useMenuToggle } from './useMenuToggle';

type HeaderProps = {
  preview?: boolean;
};

const Header: React.FC<HeaderProps> = ({ preview }) => {
  const { logo, navItems } = useSettings();
  const isAtTop = useZeroScrollY();
  const [isOpen, toggle] = useMenuToggle(false);

  const isClosed = !isOpen;

  const logoImg = imageBuilder.image(logo).url();
  const pathname = usePathname();
  const [session, loading] = useSession();

  return (
    <header
      className={`w-full flex flex-col fixed top-0 z-50 transition duration-300 ${
        preview ? 'pt-10' : ''
      } ${isAtTop && isClosed ? '' : 'nav-scroll'}`}
    >
      <Navbar
        logoImg={logoImg}
        user={session?.user}
        pathname={pathname}
        navItems={navItems}
        loading={loading}
        isOpen={isOpen}
        toggle={toggle}
      />
    </header>
  );
};

export default Header;
