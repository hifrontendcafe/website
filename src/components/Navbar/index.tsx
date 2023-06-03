import Image from 'next/image';
import Link from 'next/link';
import { NavItemData } from '../../lib/types';
import MenuBtn from './MenuBtn';
import NavItem from './NavItem';
import UserSettings from './UserSettings';

interface NavbarProps {
  navItems: NavItemData[];
  logoImg: string;
  isOpen: boolean;
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  logoImg,
  isOpen,
  toggle,
}) => {
  return (
    <nav
      id="site-menu"
      className="container mx-auto grid auto-cols-fr items-center justify-items-center lg:grid-flow-col"
    >
      <div className="flex w-full flex-row flex-nowrap items-center justify-between justify-self-start lg:w-auto lg:flex-none lg:self-center">
        <Link href="/">
          <Image
            src={logoImg}
            width={197}
            height={36}
            priority
            blurDataURL={logoImg}
            alt="Logo FrontendCafe"
          />
        </Link>
        <MenuBtn onClick={toggle} isOpen={isOpen} />
      </div>

      <ul
        className={`w-full md:text-sm lg:flex lg:justify-center lg:self-center lg:py-0 ${
          isOpen ? 'py-4' : 'hidden'
        }`}
      >
        {navItems?.map(({ link, title }) => (
          <li key={link} className="lg:flex-1 lg:text-center">
            <NavItem link={link} title={title} />
          </li>
        ))}
      </ul>

      <UserSettings navIsOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
