import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export const useClickOutside = (HTMLRefElement: RefObject<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    console.log(!HTMLRefElement.current.contains(e.target as Node))
    if (
      HTMLRefElement.current &&
      !HTMLRefElement.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

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
