import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDebounce from '../hooks/useDebounce.js';
import { getSearchIndex } from '../data/searchIndex.js';
import './SearchOverlay.css';

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function SearchOverlay({ open, onClose, triggerRef }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const typeLabels = {
    news: t('search.typeNews'),
    product: t('search.typeProduct'),
  };

  const results = useMemo(() => {
    const q = normalize(debouncedQuery.trim());
    if (!q) return [];
    return getSearchIndex(i18n.language).filter(
      (item) => normalize(item.title).includes(q) || normalize(item.text).includes(q)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, i18n.language]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else triggerRef?.current?.focus();
  }, [open, triggerRef]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  const goToResult = (item) => {
    navigate(item.url);
    setQuery('');
    onClose();
  };

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        goToResult(results[activeIndex]);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results, activeIndex]);

  useEffect(() => {
    if (!open) return undefined;

    const onClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) onClose();
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const grouped = results.reduce((acc, item) => {
    (acc[item.type] ||= []).push(item);
    return acc;
  }, {});

  return (
    <div className="search-overlay-backdrop">
      <div className="search-overlay" ref={overlayRef} role="search">
        <div className="search-input-row">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.ariaLabel')}
          />
          <button type="button" onClick={onClose} aria-label={t('search.close')}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="search-results">
          {debouncedQuery.trim() === '' && <p className="search-hint">{t('search.hint')}</p>}

          {debouncedQuery.trim() !== '' && results.length === 0 && (
            <p className="search-hint">{t('search.noResults', { query: debouncedQuery })}</p>
          )}

          {Object.entries(grouped).map(([type, items]) => (
            <div className="search-group" key={type}>
              <div className="search-group-title">{typeLabels[type] ?? type}</div>

              {items.map((item) => {
                const globalIndex = results.indexOf(item);
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`search-result${globalIndex === activeIndex ? ' active' : ''}`}
                    onClick={() => goToResult(item)}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;
