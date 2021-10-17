import { useLayoutEffect, useState } from 'react';

type UseScrollPosition = () => { scrollPosition: number };

const useScrollPosition: UseScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  });

  return { scrollPosition };
};

export { useScrollPosition };
