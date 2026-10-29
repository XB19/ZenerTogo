import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard.jsx';
import { boutiqueProducts, catalogFilters } from '../data/mockData.js';
import './Boutique.css';

// Catalogue (routes /produits et /boutique), même parcours que
// zener.tg/produits : un formulaire de recherche (nom + type, marque,
// métier, public) qui ne s'applique qu'à la validation, via les paramètres
// d'URL (?q=&type=&marque=&metier=&public=), puis la sélection filtrée.

const FILTER_KEYS = ['type', 'marque', 'metier', 'public'];
const ALL_LABEL_KEYS = { type: 'allTypes', marque: 'allBrands', metier: 'allMetiers', public: 'allPublics' };

function readParams(searchParams) {
  return {
    q: searchParams.get('q') ?? '',
    type: searchParams.get('type') ?? '',
    marque: searchParams.get('marque') ?? '',
    metier: searchParams.get('metier') ?? '',
    public: searchParams.get('public') ?? '',
  };
}

function matches(product, criteria) {
  const q = criteria.q.trim().toLowerCase();
  if (q && !product.name.toLowerCase().includes(q)) return false;
  if (criteria.type && product.type !== criteria.type) return false;
  if (criteria.marque && product.brand !== criteria.marque) return false;
  if (criteria.metier && product.metier !== criteria.metier) return false;
  if (criteria.public && !product.publics.includes(criteria.public)) return false;
  return true;
}

// Formulaire de recherche : remonté (via `key`) à chaque changement d'URL
// pour repartir des critères actifs (lien d'une marque, bouton précédent...).
function CatalogSearch({ initial, hasCriteria, onSearch }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    Object.entries(form).forEach(([key, value]) => {
      if (value.trim()) next[key] = value.trim();
    });
    onSearch(next);
  };

  return (
    <form className="catalog-search" role="search" onSubmit={handleSubmit}>
      <div className="catalog-search-head">
        <div>
          <p className="catalog-eyebrow">{t('boutique.search.eyebrow')}</p>
          <h2>{t('boutique.search.title')}</h2>
        </div>
        <Link to="/panier" className="catalog-cart-link">
          {t('boutique.search.viewCart')} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="catalog-fields">
        <label className="catalog-field catalog-field-query" htmlFor="produit-recherche">
          <span>{t('boutique.search.query')}</span>
          <input
            id="produit-recherche"
            type="search"
            name="q"
            value={form.q}
            onChange={handleChange}
            placeholder={t('boutique.search.queryPlaceholder')}
          />
        </label>

        {FILTER_KEYS.map((key) => (
          <label className="catalog-field" htmlFor={`filtre-${key}`} key={key}>
            <span>{t(`boutique.filters.${key}`)}</span>
            <select id={`filtre-${key}`} name={key} value={form[key]} onChange={handleChange}>
              <option value="">{t(`boutique.filters.${ALL_LABEL_KEYS[key]}`)}</option>
              {catalogFilters[key].map((value) => (
                <option value={value} key={value}>
                  {t(`boutique.options.${key}.${value}`)}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="catalog-actions">
        <button type="submit" className="catalog-submit">
          {t('boutique.search.submit')}
        </button>
        {hasCriteria && (
          <Link to={{ search: '' }} className="catalog-reset">
            {t('boutique.search.reset')}
          </Link>
        )}
      </div>
    </form>
  );
}

function Boutique() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const criteria = useMemo(() => readParams(searchParams), [searchParams]);
  const results = useMemo(() => boutiqueProducts.filter((p) => matches(p, criteria)), [criteria]);
  const hasCriteria = Object.values(criteria).some(Boolean);

  return (
    <div className="page-boutique">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-overlay"></div>

        <div className="container">
          <div className="shop-hero-content">
            <nav className="zn-breadcrumb" aria-label={t('a11y.breadcrumb')}>
              <Link to="/">{t('boutique.breadcrumb.home')}</Link>
              <span aria-hidden="true">/</span>
              <span>{t('boutique.breadcrumb.catalog')}</span>
            </nav>
            <span className="shop-badge">{t('boutique.hero.badge')}</span>
            <h1>{t('boutique.hero.title')}</h1>
            <p>{t('boutique.hero.description')}</p>
          </div>
        </div>
      </section>

      {/* RECHERCHE + PRODUITS */}
      <section className="featured-products">
        <div className="container">
          <CatalogSearch
            key={searchParams.toString()}
            initial={criteria}
            hasCriteria={hasCriteria}
            onSearch={setSearchParams}
          />

          <div className="catalog-results-head">
            <div>
              <p className="catalog-eyebrow">{t('boutique.results.eyebrow')}</p>
              <h2>{t(results.length === 1 ? 'boutique.results.countOne' : 'boutique.results.countMany', { count: results.length })}</h2>
            </div>
            {results.length > 0 && <p>{t('boutique.results.range', { count: results.length })}</p>}
          </div>

          {results.length === 0 ? (
            <p className="products-empty">{t('boutique.results.empty')}</p>
          ) : (
            <div className="products-grid">
              {results.map((product) => (
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
