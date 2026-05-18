import { useEffect } from 'react';

export function useScrollWords(sectionId) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const words = section.querySelectorAll('.scroll-word');
    if (!words.length) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh || rect.bottom < 0) return;

      const progress = Math.max(0, Math.min(1,
        (vh * 0.65 - rect.top) / (rect.height * 0.6 + vh * 0.2)
      ));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('word-lit', i < lit));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [sectionId]);
}
