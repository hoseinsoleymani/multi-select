import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

export const useClickOutside = (HTMLRefElement: RefObject<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        HTMLRefElement.current &&
        !HTMLRefElement.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [HTMLRefElement],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    handleClickOutside,
    isOpen,
    setIsOpen,
  };
};
