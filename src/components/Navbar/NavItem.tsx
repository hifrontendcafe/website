import Link from 'next/link';

export interface NavItemProps {
  title: string;
  link: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, link, pathname }) => {
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
