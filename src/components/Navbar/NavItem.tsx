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

  const linkClasses = isActive ? 'text-primary lg:border-b-4' : 'text-tertiary';

  return (
    <Link
      href={link}
      className={`${linkClasses} pb-4 border-greenFec w-full mx-2 py-4 font-medium  md:w-auto hover:text-primary`}
    >
      {title}
    </Link>
  );
};

export default NavItem;
