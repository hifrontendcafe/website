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
  isOpen,
  toggle,
}) => {
  return (
    <nav
      id="site-menu"
      className="container flex flex-col items-center justify-between w-full mx-auto lg:flex-row"
    >
      <div className="flex flex-row flex-nowrap items-center justify-between w-full lg:w-auto lg:self-center lg:flex-none">
        {/* ATENCION esta hardcodeado el logo, antes de salir a prod. eliminar codigo debajo de este codigo y dejar el que esta comentado. */}
        <Link href="/">
          <a>
            <img
              src="/logotype-fec.svg"
              className="rounded-full text-primary"
              alt="Logo FrontendCafe"
            />
          </a>
        </Link>
        {/* <Link href="/">
            <a className="flex items-center text-zinc-900 title-font">
              <img
                src={logoIMG}
                className="rounded-full text-primary"
                alt="Logo FrontendCafe"
              />
            </a>
          </Link> */}
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
