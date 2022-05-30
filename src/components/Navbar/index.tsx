import Link from 'next/link';
import { Session } from 'next-auth';
import MenuBtn from './MenuBtn';
import NavItem from './NavItem';
import UserSettings from './UserSettings';
import { NavItemData } from '../../lib/types';

interface NavbarProps {
  loading: boolean;
  navItems: NavItemData[];
  user?: Session['user'];
  pathname: string;
  logoImg: string;
  isOpen: boolean;
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  loading,
  user,
  pathname,
  logoImg,
  isOpen,
  toggle,
}) => {
  return (
    <nav
      id="site-menu"
      className="container flex flex-col items-center justify-between w-full mx-auto lg:flex-row"
    >
      <div className="flex flex-row items-center justify-between w-full flex-nowrap lg:w-auto lg:self-center lg:flex-none">
        <Link href="/">
          <a className="flex items-center text-zinc-900 title-font">
            <img
              src={logoImg}
              className="rounded-full text-primary"
              alt="Logo FrontendCafe"
            />
          </a>
        </Link>
        <MenuBtn onClick={() => toggle()} isOpen={isOpen} />
      </div>
      <div
        className={`lg:flex lg:flex-row lg:self-center lg:pb-0 lg:py-0 lg:w-auto text-md md:text-sm ${
          isOpen ? 'py-1 pb-4 flex flex-col w-full' : 'hidden'
        }`}
      >
        {navItems?.map(({ link, title }) => (
          <NavItem link={link} title={title} pathname={pathname} key={link} />
        ))}
      </div>
      {<UserSettings loading={loading} user={user} navIsOpen={isOpen} />}
    </nav>
  );
};

export default Navbar;
