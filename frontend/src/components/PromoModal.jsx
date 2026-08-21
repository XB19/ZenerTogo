import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { promoConfig } from '../data/promoConfig.js';
import { pickLang } from '../utils/i18nData.js';
import './PromoModal.css';

const STORAGE_KEY = 'zener_promo_dismissed_at';

function shouldShow() {
  if (!promoConfig.enabled) return false;

  const dismissedAt = localStorage.getItem(STORAGE_KEY);
  if (!dismissedAt) return true;

  const cooldownMs = promoConfig.cooldownDays * 24 * 60 * 60 * 1000;
  return Date.now() - Number(dismissedAt) > cooldownMs;
}

function PromoModal({ chatOpen }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!shouldShow()) return undefined;

    const timer = setTimeout(() => {
      if (!chatOpen) setOpen(true);
    }, promoConfig.delayMs);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return undefined;

    previousFocus.current = document.activeElement;
    dialogRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Le chat prend priorité : si l'utilisateur l'ouvre pendant que le popup
  // patiente, on annule simplement l'ouverture programmée (le popup fermé
  // par close() n'est jamais rouvert dans la même session).
  useEffect(() => {
    if (chatOpen && open) setOpen(false);
  }, [chatOpen, open]);

  if (!open) return null;

  return createPortal(
    <div className="promo-overlay" onClick={close}>
      <div
        className="promo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="promo-close" onClick={close} aria-label={t('promoModal.close')}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <img src={promoConfig.image} alt="" />

        <div className="promo-body">
          <h2 id="promo-title">{pickLang(promoConfig.title, i18n.language)}</h2>
          <p>{pickLang(promoConfig.text, i18n.language)}</p>

          <Link to={promoConfig.ctaLink} className="promo-cta" onClick={close}>
            {pickLang(promoConfig.ctaLabel, i18n.language)}
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PromoModal;
