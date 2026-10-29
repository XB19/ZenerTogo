import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGUAGES = ['fr', 'en', 'pt'];

// Tous les fichiers locales/<langue>/<page>.json sont chargés d'un coup.
// common.json est à la racine du namespace ; chaque autre fichier est
// rangé sous une clé portant son nom (home, about...), sauf faq.json qui
// devient faqPage pour ne pas entrer en conflit avec nav.faq / home.faq.
const files = import.meta.glob('../locales/*/*.json', { eager: true, import: 'default' });
const KEY_OVERRIDES = { faq: 'faqPage' };

const resources = Object.fromEntries(SUPPORTED_LANGUAGES.map((lng) => [lng, { common: {} }]));

Object.entries(files).forEach(([path, content]) => {
  const [, lng, name] = path.match(/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!resources[lng]) return;
  if (name === 'common') {
    Object.assign(resources[lng].common, content);
  } else {
    resources[lng].common[KEY_OVERRIDES[name] ?? name] = content;
  }
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'fr',
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'zener_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

function syncHtmlLang(lng) {
  document.documentElement.lang = lng;
}

i18n.on('languageChanged', syncHtmlLang);
syncHtmlLang(i18n.resolvedLanguage || 'fr');

export default i18n;
