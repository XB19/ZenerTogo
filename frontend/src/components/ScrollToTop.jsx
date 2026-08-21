import { useCallback, useEffect, useRef, useState } from 'react';
import './ScrollToTop.css';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  return (
    <button
      type="button"
      className={`scroll-to-top${visible ? ' visible' : ''}`}
      onClick={handleClick}
      aria-label="Retour en haut de page"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;
