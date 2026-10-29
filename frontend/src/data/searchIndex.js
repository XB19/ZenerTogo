import { actualites, boutiqueProducts } from './mockData.js';
import { pickLang } from '../utils/i18nData.js';

export function getSearchIndex(lang) {
  return [
    ...actualites.map((a) => ({
      type: 'news',
      id: `actualite-${a.id}`,
      title: pickLang(a.titre, lang),
      text: pickLang(a.contenu, lang).replace(/^## /gm, ''),
      url: `/news/${a.id}`,
    })),
    ...boutiqueProducts.map((p) => ({
      type: 'product',
      id: `produit-${p.id}`,
      title: p.name,
      text: p.price,
      url: `/produits/${p.slug}`,
    })),
  ];
}
