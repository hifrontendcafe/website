import { MouseEventHandler } from 'react';

interface MenuBtnProps {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className={`block hamburger lg:hidden focus:outline-none ${
        isOpen ? 'open' : ''
      }`}
      aria-label="Menu"
      type="button"
      onClick={onClick}
    >
      <span className="hamburger__top-bun"></span>
      <span className="hamburger__bottom-bun"></span>
    </button>
  );
};

export default MenuBtn;
