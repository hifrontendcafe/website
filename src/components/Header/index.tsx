import Link from 'next/link';
import { useRef } from 'react';

interface HeaderProps {
  preview: boolean;
}

const Header: React.FC<HeaderProps> = ({ preview }) => {
  const menuBtn = useRef(null);
  const menu = useRef(null);

  function menuHandler() {
    menuBtn.current.classList.toggle('open');
    menu.current.classList.toggle('flex');
    menu.current.classList.toggle('hidden');
  }

  const navItems = [
    { title: 'Eventos', link: '/eventos' },
    { title: 'Mentorías', link: '/mentorias' },
    { title: 'Proyectos', link: '/cmyk' },
    { title: 'Iniciativas', link: '/iniciativas' },
  ];

  return (
    <header
      className={`shadow-md w-full flex flex-col fixed md:relative bg-white z-50 ${
        preview ? 'pt-10' : ''
      }`}
    >
      <nav
        id="site-menu"
        className="container mx-auto flex flex-col md:flex-row w-full justify-between items-center px-4 md:px-6 bg-white shadow md:shadow-none"
      >
        <div className="w-full md:w-auto self-start md:self-center flex flex-row md:flex-none flex-no-wrap justify-between items-center">
          <Link href="/">
            <a className="flex title-font items-center text-gray-900">
              <img
                src="/logo.svg"
                className="w-16 h-16 text-white p-2 rounded-full"
                alt="Logo FrontendCafe"
              />
            </a>
          </Link>
          <button
            ref={menuBtn}
            className="hamburger block md:hidden focus:outline-none"
            type="button"
            onClick={() => menuHandler()}
          >
            <span className="hamburger__top-bun"></span>
            <span className="hamburger__bottom-bun"></span>
          </button>
        </div>
        <div
          ref={menu}
          className="w-full md:w-auto self-end md:self-center md:flex flex-col md:flex-row items-center h-full py-1 pb-4 md:py-0 md:pb-0 hidden"
        >
          {navItems.map((item) => (
            <Link href={item.link} key={item.link}>
              <a className="w-full md:w-auto text-center px-4 py-2 text-gray-600 hover:text-gray-800">
                {item.title}
              </a>
            </Link>
          ))}
          <Link href="https://discord.com/invite/3GC6TJd">
            <a
              target="_blank"
              className={'btn btn-secondary ml-3'}
              style={{ transition: 'all .15s ease' }}
            >
              Sumate a Discord
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
