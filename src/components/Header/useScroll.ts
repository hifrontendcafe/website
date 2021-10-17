import { useEffect, useState } from 'react';

type UseScrollPosition = () => boolean;

const useZeroScrollY: UseScrollPosition = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const updatePosition = () => {
      if (isAtTop && window.scrollY !== 0) {
        setIsAtTop(false);
      } else if (!isAtTop && window.scrollY === 0) {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isAtTop]);

  return isAtTop;
};

export { useZeroScrollY };
