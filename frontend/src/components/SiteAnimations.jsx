import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SiteAnimations.css';

/**
 * Animations d'apparition au scroll, appliquées automatiquement à toutes les
 * pages publiques sans avoir à annoter chaque composant.
 *
 * Pour chaque <section> du contenu (et le pied de page), on repère les blocs
 * de premier niveau : une grille (display grid, ou flex qui passe à la ligne)
 * voit ses cartes apparaître en cascade, une grille à deux colonnes fait
 * glisser ses deux moitiés depuis la gauche et la droite, et tout autre bloc
 * monte en fondu. Les classes sont retirées une fois l'animation jouée, pour
 * rendre la main aux effets de survol existants (transform des cartes...).
 *
 * Désactivé si l'utilisateur a demandé à réduire les animations.
 */

const SKIP_SELECTOR = '.hero, .swiper-wrapper, .reveal-on-scroll, .leaflet-container, [data-no-reveal]';
const MAX_DELAY = 480;
const STEP = 90;

function isGroup(el) {
  if (el.children.length < 2) return false;
  const cs = getComputedStyle(el);
  if (cs.display === 'grid' || cs.display === 'inline-grid') return true;
  return cs.display === 'flex' && cs.flexWrap !== 'nowrap';
}

function skippable(el) {
  if (el.classList.contains('zr') || el.dataset.zrDone) return true;
  if (el.closest(SKIP_SELECTOR)) return true;
  const cs = getComputedStyle(el);
  if (cs.position === 'absolute' || cs.position === 'fixed') return true;
  if (cs.display === 'none' || el.tagName === 'SCRIPT') return true;
  return false;
}

function tag(el, variant, delay, queue) {
  if (skippable(el)) return;
  el.classList.add('zr', `zr-${variant}`);
  el.style.setProperty('--zr-delay', `${Math.min(delay, MAX_DELAY)}ms`);
  queue.push(el);
}

function walk(parent, depth, queue) {
  [...parent.children].forEach((child, i) => {
    if (skippable(child)) return;

    if (isGroup(child)) {
      const items = [...child.children];
      const pair = items.length === 2;
      items.forEach((item, j) => {
        tag(item, pair ? (j === 0 ? 'left' : 'right') : 'up', j * STEP, queue);
      });
      return;
    }

    // Simple conteneur (ex. .container, wrapper) qui contient lui-même une
    // grille : on descend d'un niveau pour animer les cartes individuellement.
    const hasGroupChild = depth < 2 && [...child.children].some((c) => !skippable(c) && isGroup(c));
    if (hasGroupChild) {
      walk(child, depth + 1, queue);
      return;
    }

    tag(child, 'up', i * 60, queue);
  });
}

function collect(root) {
  const queue = [];
  root.querySelectorAll('main section, footer .footer-grid').forEach((section) => {
    if (section.closest(SKIP_SELECTOR)) return;
    if (section.matches('.footer-grid')) {
      [...section.children].forEach((c, i) => tag(c, 'up', i * STEP, queue));
      return;
    }
    walk(section, 0, queue);
  });
  return queue;
}

function SiteAnimations() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  // Barre de progression de lecture + en-tête compact au scroll.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        document.documentElement.classList.toggle('zr-scrolled', window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);
          el.classList.add('zr-in');
          const delay = parseInt(el.style.getPropertyValue('--zr-delay'), 10) || 0;
          setTimeout(() => {
            el.classList.remove('zr', 'zr-in', 'zr-up', 'zr-left', 'zr-right');
            el.style.removeProperty('--zr-delay');
            el.dataset.zrDone = '1';
          }, delay + 950);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const scan = () => collect(document).forEach((el) => observer.observe(el));

    // Le contenu de certaines pages arrive après coup (chargement simulé de la
    // boutique, filtres, traductions) : on rescanne quand le DOM change.
    let pending = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(scan);
    });

    const start = requestAnimationFrame(() => {
      scan();
      const main = document.querySelector('.client-app main');
      if (main) mutations.observe(main, { childList: true, subtree: true });
    });

    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(pending);
      mutations.disconnect();
      observer.disconnect();
      document.querySelectorAll('.zr').forEach((el) => {
        el.classList.remove('zr', 'zr-in', 'zr-up', 'zr-left', 'zr-right');
      });
    };
  }, [pathname]);

  return (
    <div className="zr-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }}></span>
    </div>
  );
}

export default SiteAnimations;
