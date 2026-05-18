import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Hero + fade-up: fire immediately on load
    const heroEls = document.querySelectorAll('[data-animate="hero"], [data-animate="fade-up"]');
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        heroEls.forEach(el => el.classList.add('animate-in'))
      )
    );

    // Scroll-driven: trigger when element enters viewport
    const scrollEls = document.querySelectorAll(
      '[data-animate="scroll-up"], [data-animate="scroll-left"], [data-animate="scroll-right"]'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    scrollEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
