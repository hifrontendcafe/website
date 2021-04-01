import Link from 'next/link';
import { useRef } from 'react';
import { imageBuilder } from '../../lib/sanity';
import { Image } from '../../lib/types';

interface HeaderProps {
  preview: boolean;
  menu: Array<string>;
  logo: Image;
}

const Header: React.FC<HeaderProps> = ({ preview, menu, logo }) => {
  const menuBtn = useRef(null);
  const menuDOM = useRef(null);
  const logoIMG = imageBuilder.image(logo).url();

  function menuHandler() {
    menuBtn.current.classList.toggle('open');
    menuDOM.current.classList.toggle('flex');
    menuDOM.current.classList.toggle('hidden');
  }

  const navItems = menu.map((item) => {
    const [title, link] = item.split('/');
    return { title, link };
  });

  return (
    <header
      className={`shadow-md w-full flex flex-col fixed md:relative bg-white z-50 ${
        preview ? 'pt-10' : ''
      }`}
    >
      <nav
        id="site-menu"
        className="container mx-auto flex flex-col md:flex-row w-full justify-between items-center px-4 md:px-16 bg-white shadow md:shadow-none"
      >
        <div className="w-full md:w-auto self-start md:self-center flex flex-row md:flex-none flex-no-wrap justify-between items-center">
          <Link href="/">
            <a className="flex title-font items-center text-gray-900">
              <img
                src={logoIMG}
                className="h-16 p-2 text-white rounded-full"
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
          ref={menuDOM}
          className="flex-col items-center self-end hidden w-full h-full py-1 pb-4 md:w-auto md:self-center md:flex md:flex-row md:py-0 md:pb-0"
        >
          {navItems.map((item) => (
            <Link href={item.link} key={item.link}>
              <a className="w-full md:w-auto text-center px-6 py-2 text-gray-600 hover:text-gray-800 font-medium">
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
