'use client';

import Navbar from '@/components/Navbar';
import { imageBuilder } from '@/lib/sanity';
import { Image, NavItemData } from '@/lib/types';
import { useMenuToggle } from './useMenuToggle';
import { useZeroScrollY } from './useScroll';

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
      className={`fixed top-0 z-50 flex w-full flex-col border-b border-[#434345]/75 transition duration-300 ${
        preview ? 'pt-10' : ''
      } ${
        isAtTop && isClosed
          ? 'border-b-transparent'
          : `bg-zinc-900 ${
              isAtTop ? 'lg:border-b-transparent lg:bg-transparent ' : ''
            }`
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
