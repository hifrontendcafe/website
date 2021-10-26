import Link from 'next/link';

export interface NavItemProps {
  title: string;
  link: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, link, pathname }) => {
  const isActive = pathname === `/${link}`;

  return (
    <Link href={`/${link}`}>
      <a
        className={
          (isActive
            ? 'text-coolGray-50 lg:border-b-2 pb-2 border-greenFec'
            : 'text-coolGray-400') +
          ' w-full mx-2 py-4 font-medium  md:w-auto hover:text-gray-50'
        }
      >
        {title}
      </a>
    </Link>
  );
};

export default NavItem;
