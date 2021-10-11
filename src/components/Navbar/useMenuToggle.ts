import { useState } from 'react';

export function useMenuToggle(): [boolean, () => void] {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return [isMenuOpen, toggleMenu];
}
