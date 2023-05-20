'use client';

import { imageBuilder } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import { useZeroScrollY } from './useScroll';
import { useMenuToggle } from './useMenuToggle';
import { Image, NavItemData } from '@/lib/types';

type HeaderProps = {
  preview?: boolean;
  logo: Image;
  navItems: NavItemData[];
};

const Header: React.FC<HeaderProps> = ({ preview, logo, navItems }) => {
  const isAtTop = useZeroScrollY();
  const [isOpen, toggle] = useMenuToggle(false);

  const isClosed = !isOpen;

  const logoImg = imageBuilder.image(logo).url();

  return (
    <header
      className={`w-full flex flex-col fixed top-0 z-50 transition duration-300 ${
        preview ? 'pt-10' : ''
      } ${
        isAtTop && isClosed
          ? ''
          : 'items-center bg-zinc-900 shadow-[0px_1px_0px_#434345]'
      }`}
    >
      <Navbar
        logoImg={logoImg}
        navItems={navItems}
        isOpen={isOpen}
        toggle={toggle}
      />
    </header>
  );
};

export default Header;
