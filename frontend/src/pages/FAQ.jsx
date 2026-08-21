import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQSection from '../components/FAQSection.jsx';
import { faqs } from '../data/faq.js';
import { pickLang } from '../utils/i18nData.js';
import './FAQ.css';

function FAQ() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [query, setQuery] = useState('');

  const localizedFaqs = useMemo(
    () =>
      faqs.map((item) => ({
        id: item.id,
        category: item.category,
        question: pickLang(item.question, lang),
        answer: pickLang(item.answer, lang),
      })),
    [lang]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return localizedFaqs;
    return localizedFaqs.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [localizedFaqs, query]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localizedFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="page-faq">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <section className="faq-hero">
        <div className="faq-overlay"></div>

        <div className="container">
          <div className="faq-hero-content">
            <span className="faq-badge">{t('faqPage.hero.badge')}</span>
            <h1>{t('faqPage.hero.title')}</h1>
            <p>{t('faqPage.hero.description')}</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder={t('faqPage.search.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t('faqPage.search.ariaLabel')}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="faq-empty">{t('faqPage.empty')}</p>
          ) : (
            <div className="faq-list">
              <FAQSection items={filtered} />
            </div>
          )}
        </div>
      </section>

      <section className="faq-cta">
        <div className="container">
          <h2>{t('faqPage.cta.title')}</h2>
          <p>{t('faqPage.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('faqPage.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
