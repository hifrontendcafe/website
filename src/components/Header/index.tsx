import Link from 'next/link';
import { useRef } from 'react';
import { imageBuilder } from '../../lib/sanity';
import { useSettings } from '@/hooks/api';
import { useRouter } from 'next/router';

type HeaderProps = {
  preview: boolean;
};

const Header: React.FC<HeaderProps> = ({ preview }) => {
  const {
    data: { logo, menu },
  } = useSettings();
  const menuBtn = useRef(null);
  const menuDOM = useRef(null);
  const logoIMG = imageBuilder.image(logo).url();
  const router = useRouter();

  function menuHandler() {
    menuBtn.current.classList.toggle('open');
    menuDOM.current.classList.toggle('flex');
    menuDOM.current.classList.toggle('hidden');
  }

  const navItems = menu?.map((item) => {
    const [title, link] = item.split('/');
    return { title, link };
  });

  return (
    <header
      className={`w-full flex flex-col sticky top-0 bg-white z-50 shadow-sm ${
        preview ? 'pt-10' : ''
      }`}
    >
      <nav
        id="site-menu"
        className="flex flex-col items-center justify-between w-full px-4 mx-auto bg-white lg:container lg:flex-row lg:shadow-none"
      >
        <div className="flex flex-row flex-no-wrap items-center self-start justify-between w-full lg:w-auto lg:self-center lg:flex-none">
          <Link href="/">
            <a className="flex items-center h-16 text-gray-900 title-font">
              <img
                src={logoIMG}
                className="h-12 p-2 text-white rounded-full"
                alt="Logo FrontendCafe"
              />
            </a>
          </Link>
          <button
            ref={menuBtn}
            className="block hamburger lg:hidden focus:outline-none"
            type="button"
            onClick={() => menuHandler()}
          >
            <span className="hamburger__top-bun"></span>
            <span className="hamburger__bottom-bun"></span>
          </button>
        </div>
        <div
          ref={menuDOM}
          className="flex-col items-center hidden w-full h-full py-1 pb-4 text-sm lg:w-auto lg:self-center lg:flex lg:flex-row lg:py-0 lg:pb-0"
        >
          {navItems?.map((item) => (
            <Link href={`/${item.link}`} key={item.link}>
              <a
                className={
                  (router.pathname === `/${item.link}`
                    ? 'text-gray-500 font-bold '
                    : 'text-gray-500 ') +
                  'w-full px-2 py-1 font-medium  text-center md:w-auto hover:text-gray-800'
                }
              >
                {item.title}
              </a>
            </Link>
          ))}
          <Link href="https://discord.gg/frontendcafe">
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
