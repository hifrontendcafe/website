import Link from 'next/link'
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
  return (
    <header
      className={`container mx-auto w-full flex flex-col fixed sm:relative bg-white z-50 ${
        preview ? 'pt-10' : ''
      }`}
    >
      <nav
        id="site-menu"
        className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white shadow sm:shadow-none"
      >
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link href="/">
            <a className="flex title-font items-center text-gray-900">
              <img
                src="/logo.svg"
                className="w-12 h-12 text-white p-2 rounded-full"
                alt="FRONTENDCAFE"
              />
              <span className="ml-1 text-xl text-gray-600 font-semibold">
                FRONTEND
              </span>
              <span className="text-xl text-gray-600 font-normal">CAFE</span>
            </a>
          </Link>
          <button
            ref={menuBtn}
            className="hamburger block sm:hidden focus:outline-none"
            type="button"
            onClick={() => menuHandler()}
          >
            <span className="hamburger__top-bun"></span>
            <span className="hamburger__bottom-bun"></span>
          </button>
        </div>
        <div
          ref={menu}
          className="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden"
        >
          <Link href="/#events">
            <a className="w-full md:w-auto text-center px-4 py-2 text-gray-600 hover:text-gray-800">
              Eventos
            </a>
          </Link>
          <Link href="/mentorias">
            <a
              className="w-full md:w-auto text-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Mentorias
            </a>
          </Link>
          <Link href="/#comunidad">
          <a className="w-full md:w-auto text-center px-4 py-2 text-gray-600 hover:text-gray-800">
            Comunidad FEC
          </a>
          </Link>
          <span className="border-l pl-2 border-gray-400 hidden md:inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start items-center">
            <a
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-gray-500 hover:text-gray-800"
              href="https://twitter.com/FrontEndCafe"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-gray-500 hover:text-gray-800"
              href="https://www.instagram.com/frontendcafe_"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-gray-500 hover:text-gray-800"
              href="https://www.linkedin.com/company/frontendcafe"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
