import Link from 'next/link';
import { MouseEventHandler, forwardRef, ReactNode } from 'react';

export interface AnchorProps {
  isActive: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  children: ReactNode;
  type: 'button' | 'a';
}

const Anchor = (
  { isActive, onClick, children, href, type }: AnchorProps,
  ref,
) => {
  if (type === 'button') {
    return (
      <button
        className={
          (isActive
            ? 'text-primary lg:border-b-2 pb-2 border-greenFec'
            : 'text-secondary') +
          ' w-full mx-2 py-4 font-medium  md:w-auto hover:text-primary'
        }
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      className={
        (isActive
          ? 'text-primary lg:border-b-2 pb-2 border-greenFec'
          : 'text-secondary') +
        ' w-full mx-2 py-4 font-medium  md:w-auto hover:text-primary'
      }
      onClick={onClick}
      href={href}
      ref={ref}
    >
      {children}
    </a>
  );
};

const ForwardedAnchor = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AnchorProps
>(Anchor);

export interface NavItemProps {
  title: string;
  link: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, link, pathname }) => {
  const isActive = pathname === `/${link}`;

  return (
    <Link href={`/${link}`} passHref>
      <ForwardedAnchor type="a" isActive={isActive}>
        {title}
      </ForwardedAnchor>
    </Link>
  );
};

export default NavItem;
