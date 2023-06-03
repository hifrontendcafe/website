import { MouseEventHandler } from 'react';

interface MenuBtnProps {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className={`hamburger lg:hidden ${isOpen ? 'open' : ''}`}
      aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} menú de navegación`}
      type="button"
      onClick={onClick}
    >
      <span className="hamburger__top-bun"></span>
      <span className="hamburger__bottom-bun"></span>
    </button>
  );
};

export default MenuBtn;
