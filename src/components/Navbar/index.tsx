import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useMenuToggle } from './useMenuToggle';
import MenuBtn from './MenuBtn';

interface NavItem {
  title: string;
  link: string;
}

interface NavbarProps {
  loading: boolean;
  navItems: NavItem[];
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
              className="p-2 text-gray-50 rounded-full"
              alt="Logo FrontendCafe"
            />
          </a>
        </Link>
        {/* <Link href="/">
            <a className="flex items-center text-gray-900 title-font">
              <img
                src={logoIMG}
                className="p-2 text-gray-50 rounded-full"
                alt="Logo FrontendCafe"
              />
            </a>
          </Link> */}
        <MenuBtn onClick={() => toggle()} isOpen={isOpen} />
      </div>
      <div
        className={`flex-col items-center ${
          isOpen ? '' : 'hidden'
        } w-full h-full py-1 pb-4 text-sm lg:w-auto lg:self-center lg:flex lg:flex-row lg:py-0 lg:pb-0 flex`}
      >
        {navItems?.map((item) => (
          <Link href={`/${item.link}`} key={item.link}>
            <a
              className={
                (pathname === `/${item.link}`
                  ? 'text-gray-300 font-bold '
                  : 'text-gray-300 ') +
                'w-full px-2 py-1 font-medium  text-center md:w-auto hover:text-gray-100'
              }
            >
              {item.title}
            </a>
          </Link>
        ))}
        {!loading && !user && (
          <button
            className="flex items-center mt-2 ml-0 btn btn-border lg:mt-0 lg:ml-4 "
            style={{ transition: 'all .15s ease' }}
            onClick={() => signIn('discord')}
          >
            <FontAwesomeIcon icon={faDiscord} width="18px" className="mr-2" />
            Iniciar Sesión
          </button>
        )}
        {!loading && user && (
          <div className="flex items-center mt-2 lg:mt-0 lg:ml-4">
            <div>
              <Image
                className="inline-block rounded-full"
                src={user.image}
                alt="Profile image"
                width="36px"
                height="36px"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <button
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={() => signOut()}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
