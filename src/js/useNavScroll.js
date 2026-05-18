import { useEffect } from 'react';

export function useNavScroll() {
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const nav = document.getElementById('main-nav');
      if (!nav) return;
      nav.style.transform = y > lastY && y > 80 ? 'translateY(-110%)' : 'translateY(0)';
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
