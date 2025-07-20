import { useEffect, useRef } from 'react';

const useScrollDirection = () => {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        console.log('Scrolling down');
      } else if (currentScrollY < lastScrollY.current) {
        console.log('Scrolling up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollDirection;

