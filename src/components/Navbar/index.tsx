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
      className="container flex flex-col items-center justify-between w-full mx-auto lg:flex-row"
    >
      <div className="flex flex-row  items-center justify-between w-full flex-nowrap lg:w-auto lg:self-center lg:flex-none">
        <Link href="/" className="flex items-center text-zinc-900 title-font">
          <img
            src={logoImg}
            className="rounded-full text-primary"
            alt="Logo FrontendCafe"
          />
        </Link>
        <MenuBtn onClick={toggle} isOpen={isOpen} />
      </div>
      <div
        className={`lg:flex lg:flex-row lg:self-center lg:pb-0 lg:py-0 lg:w-auto text-md md:text-sm ${
          isOpen ? 'py-1 pb-4 flex flex-col w-full' : 'hidden'
        }`}
      >
        {navItems?.map(({ link, title }) => (
          <NavItem link={link} title={title} key={link} />
        ))}
      </div>

      <UserSettings navIsOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
