'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItemProps {
  title: string;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, link }) => {
  const pathname = usePathname();
  const isActive = pathname === `${link}`;

  return (
    <Link
      href={link}
      className={`${
        isActive
          ? 'border-l-greenFec lg:border-t-greenFec lg:border-l-transparent'
          : 'text-tertiary'
      } block border-[6px] border-transparent px-2 py-4 font-medium transition-colors ease-out hover:bg-greenFec/5 hover:text-primary lg:rounded-b-xl lg:pb-2 lg:pt-3`}
    >
      {title}
    </Link>
  );
};

export default NavItem;
