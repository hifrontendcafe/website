import { useState } from 'react';

export function useMenuToggle(state: boolean): [boolean, () => void] {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(state);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return [isMenuOpen, toggleMenu];
}
