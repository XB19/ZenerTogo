import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard.jsx';
import { boutiqueProducts } from '../data/mockData.js';
import './Boutique.css';

const ALL_KEY = 'all';
const CATEGORY_KEYS = ['fuel', 'gas', 'lubricant', 'uncategorized'];

function categoryOf(product) {
  return CATEGORY_KEYS.includes(product.category) ? product.category : 'uncategorized';
}

function Boutique() {
  const { t } = useTranslation();
  const [state, setState] = useState({ status: 'loading', data: [], error: null });
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('categorie') || ALL_KEY;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    setState({ status: 'loading', data: [], error: null });

    // TODO: remplacer par un vrai fetch('/api/produits', { signal: controller.signal })
    // une fois le backend PostgreSQL branché. La forme de `state` (status/data/error)
    // n'a pas besoin de changer.
    const timer = setTimeout(() => {
      if (cancelled) return;
      setState({ status: 'success', data: boutiqueProducts, error: null });
    }, 300);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const retry = () => {
    setState({ status: 'loading', data: [], error: null });
    setTimeout(() => setState({ status: 'success', data: boutiqueProducts, error: null }), 300);
  };

  const categoryCounts = useMemo(() => {
    const counts = { [ALL_KEY]: state.data.length };
    CATEGORY_KEYS.forEach((key) => {
      counts[key] = 0;
    });
    state.data.forEach((product) => {
      counts[categoryOf(product)] += 1;
    });
    return counts;
  }, [state.data]);

  const filteredProducts = useMemo(
    () =>
      activeCategory === ALL_KEY
        ? state.data
        : state.data.filter((product) => categoryOf(product) === activeCategory),
    [state.data, activeCategory]
  );

  const setCategory = (key) => {
    if (key === ALL_KEY) {
      setSearchParams({});
    } else {
      setSearchParams({ categorie: key });
    }
  };

  return (
    <div className="page-boutique">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-overlay"></div>

        <div className="container">
          <div className="shop-hero-content">
            <span className="shop-badge">{t('boutique.hero.badge')}</span>
            <h1>{t('boutique.hero.title')}</h1>
            <p>{t('boutique.hero.description')}</p>
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="featured-products">
        <div className="container">
          {state.status === 'success' && (
            <div className="shop-filters" role="group" aria-label={t('boutique.products.filterAriaLabel')}>
              {[ALL_KEY, ...CATEGORY_KEYS].map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`shop-filter${activeCategory === key ? ' active' : ''}`}
                  onClick={() => setCategory(key)}
                  aria-pressed={activeCategory === key}
                >
                  {t(`boutique.categories.${key}`)} ({categoryCounts[key]})
                </button>
              ))}
            </div>
          )}

          {state.status === 'loading' && (
            <div className="products-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="product-skeleton" key={i}>
                  <div className="skeleton-img"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line"></div>
                </div>
              ))}
            </div>
          )}

          {state.status === 'error' && (
            <div className="products-error">
              <p>{t('boutique.products.error')}</p>
              <button type="button" onClick={retry}>
                {t('boutique.products.retry')}
              </button>
            </div>
          )}

          {state.status === 'success' && state.data.length === 0 && (
            <p className="products-empty">{t('boutique.products.empty')}</p>
          )}

          {state.status === 'success' && state.data.length > 0 && filteredProducts.length === 0 && (
            <p className="products-empty">{t('boutique.products.emptyCategory')}</p>
          )}

          {state.status === 'success' && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="shop-cta">
        <div className="container">
          <h2>{t('boutique.cta.title')}</h2>
          <p>{t('boutique.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('boutique.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Boutique;
