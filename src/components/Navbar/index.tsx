import Link from 'next/link';
import { Session } from 'next-auth';
import { useMenuToggle } from './useMenuToggle';
import MenuBtn from './MenuBtn';
import NavItem from './NavItem';
import UserSettings from './UserSettings';

interface NavbarProps {
  loading: boolean;
  navItems: { title: string; link: string }[];
  user?: Session['user'];
  pathname: string;
  logoImg: string;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  loading,
  user,
  pathname,
  logoImg,
}) => {
  const [isOpen, toggle] = useMenuToggle();

  return (
    <nav
      id="site-menu"
      className="container flex flex-col items-center justify-between w-full h-16 mx-auto lg:flex-row"
    >
      <div className="flex flex-row flex-no-wrap items-center self-start justify-between w-full lg:w-auto lg:self-center lg:flex-none">
        {/* ATENCION esta hardcodeado el logo, antes de salir a prod. eliminar codigo debajo de este codigo y dejar el que esta comentado. */}
        <Link href="/">
          <a>
            <img
              src="/logotype-fec.svg"
              className="p-2 rounded-full text-gray-50"
              alt="Logo FrontendCafe"
            />
          </a>
        </Link>
        {/* <Link href="/">
            <a className="flex items-center text-gray-900 title-font">
              <img
                src={logoIMG}
                className="p-2 rounded-full text-gray-50"
                alt="Logo FrontendCafe"
              />
            </a>
          </Link> */}
        <MenuBtn onClick={() => toggle()} isOpen={isOpen} />
      </div>
      <div
        className={`flex-col ${
          isOpen ? '' : 'hidden'
        } w-full py-4 text-sm lg:w-auto lg:self-center lg:flex lg:flex-row lg:py-0 lg:pb-0 flex`}
      >
        {navItems?.map(({ link, title }) => (
          <NavItem link={link} title={title} pathname={pathname} key={link} />
        ))}
      </div>
      {!loading && isOpen && <UserSettings user={user} />}
    </nav>
  );
};

export default Navbar;
