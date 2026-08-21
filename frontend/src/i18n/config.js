import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonFr from '../locales/fr/common.json';
import commonEn from '../locales/en/common.json';
import homeFr from '../locales/fr/home.json';
import homeEn from '../locales/en/home.json';
import aboutFr from '../locales/fr/about.json';
import aboutEn from '../locales/en/about.json';
import servicesFr from '../locales/fr/services.json';
import servicesEn from '../locales/en/services.json';
import boutiqueFr from '../locales/fr/boutique.json';
import boutiqueEn from '../locales/en/boutique.json';
import stationsFr from '../locales/fr/stations.json';
import stationsEn from '../locales/en/stations.json';
import zencardFr from '../locales/fr/zencard.json';
import zencardEn from '../locales/en/zencard.json';
import newsFr from '../locales/fr/news.json';
import newsEn from '../locales/en/news.json';
import faqFr from '../locales/fr/faq.json';
import faqEn from '../locales/en/faq.json';
import contactFr from '../locales/fr/contact.json';
import contactEn from '../locales/en/contact.json';
import careersFr from '../locales/fr/careers.json';
import careersEn from '../locales/en/careers.json';
import bonPlanFr from '../locales/fr/bonPlan.json';
import bonPlanEn from '../locales/en/bonPlan.json';
import confidentialiteFr from '../locales/fr/confidentialite.json';
import confidentialiteEn from '../locales/en/confidentialite.json';
import cartFr from '../locales/fr/cart.json';
import cartEn from '../locales/en/cart.json';
import checkoutFr from '../locales/fr/checkout.json';
import checkoutEn from '../locales/en/checkout.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: {
          ...commonFr,
          home: homeFr.home ?? homeFr,
          about: aboutFr.about ?? aboutFr,
          services: servicesFr.services ?? servicesFr,
          boutique: boutiqueFr.boutique ?? boutiqueFr,
          stations: stationsFr.stations ?? stationsFr,
          zencard: zencardFr.zencard ?? zencardFr,
          news: newsFr.news ?? newsFr,
          faqPage: faqFr.faqPage ?? faqFr,
          contact: contactFr.contact ?? contactFr,
          careers: careersFr.careers ?? careersFr,
          bonPlan: bonPlanFr.bonPlan ?? bonPlanFr,
          confidentialite: confidentialiteFr.confidentialite ?? confidentialiteFr,
          cart: cartFr.cart ?? cartFr,
          checkout: checkoutFr.checkout ?? checkoutFr,
        },
      },
      en: {
        common: {
          ...commonEn,
          home: homeEn.home ?? homeEn,
          about: aboutEn.about ?? aboutEn,
          services: servicesEn.services ?? servicesEn,
          boutique: boutiqueEn.boutique ?? boutiqueEn,
          stations: stationsEn.stations ?? stationsEn,
          zencard: zencardEn.zencard ?? zencardEn,
          news: newsEn.news ?? newsEn,
          faqPage: faqEn.faqPage ?? faqEn,
          contact: contactEn.contact ?? contactEn,
          careers: careersEn.careers ?? careersEn,
          bonPlan: bonPlanEn.bonPlan ?? bonPlanEn,
          confidentialite: confidentialiteEn.confidentialite ?? confidentialiteEn,
          cart: cartEn.cart ?? cartEn,
          checkout: checkoutEn.checkout ?? checkoutEn,
        },
      },
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
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
