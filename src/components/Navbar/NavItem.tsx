'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
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
          ? 'border-l-green-fec lg:border-l-transparent lg:border-t-green-fec'
          : 'text-tertiary'
      } block border-[6px] border-transparent px-2 py-4 font-medium transition-colors ease-out hover:bg-green-fec/5 hover:text-primary lg:rounded-b-xl lg:pb-2 lg:pt-3`}
    >
      {title}
    </Link>
  );
};

export default NavItem;
