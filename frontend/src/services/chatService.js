/**
 * Assistant ZENER : répond aux questions des visiteurs à partir des données
 * du site (coordonnées, stations, produits, ZenCard, offres d'emploi...).
 *
 * Fonctionne entièrement côté navigateur, sans service externe : la
 * question est normalisée (minuscules, sans accents), on cherche d'abord
 * un produit ou une ville précise, puis le sujet dont les mots-clés
 * correspondent le mieux. Chaque réponse renvoie `{ text, links }` ; les
 * liens sont affichés comme boutons vers la page concernée.
 *
 * C'est le seul endroit à modifier pour brancher plus tard un backend de
 * conversation : garder la signature sendMessage(text, lang) -> Promise.
 */
import { boutiqueProducts, offres } from '../data/mockData.js';
import { stations } from '../data/stations.js';
import { pickLang } from '../utils/i18nData.js';

const CONTACT = {
  phone: '+228 22 27 20 00',
  email: 'info@zener.tg',
  address: {
    fr: "Zone industrielle de Lomé, route d'Aného — 08 BP 8535 Lomé, Togo",
    en: 'Lomé Industrial Zone, Aného road — 08 BP 8535 Lomé, Togo',
  },
  hours: {
    fr: 'du lundi au vendredi de 8 h à 16 h 45 (fermé le samedi et le dimanche)',
    en: 'Monday to Friday, 8 am to 4:45 pm (closed on Saturday and Sunday)',
  },
};

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/(\d)\s*[,.]\s*(\d)/g, '$1.$2')
    .replace(/[^a-z0-9.]+/g, ' ')
    .trim();
}

function words(text) {
  return normalize(text).split(' ').filter(Boolean);
}

// Un mot-clé « correspond » si un mot de la question commence par lui
// (« contact » couvre « contacter », « contactez »...). Les mots-clés très
// courts (« hi », « cv », « tel ») doivent correspondre au mot entier, et
// ceux de plusieurs mots sont cherchés tels quels dans la phrase.
function hits(question, tokens, keywords) {
  let score = 0;
  keywords.forEach((kw) => {
    if (kw.includes(' ')) {
      if (question.includes(kw)) score += 2;
    } else if (kw.length <= 3 ? tokens.includes(kw) : tokens.some((w) => w.startsWith(kw))) {
      score += 1;
    }
  });
  return score;
}

const L = (fr, en) => ({ fr, en });
const link = (label, to) => ({ label, to });

/* ---------- Détecteurs précis : produit, ville ---------- */

const PRODUCT_ALIASES = {
  'la-petite-butane-sikavi-6kg': ['sikavi', 'petite butane', '6kg', '6 kg'],
  'evalu-50kg': ['evalu', '50kg', '50 kg'],
  'enora-de-6kg': ['enora 6', 'enora de 6', '6kg', '6 kg'],
  'enora-de-125kg': ['enora 12', 'enora de 12', '12.5'],
  abire: ['abire', '12.5'],
  'aboe-nomou-6kg-robinet': ['aboe', 'nomou', 'robinet', '6kg', '6 kg'],
  'apefa-3-kg': ['apefa', '3kg', '3 kg'],
  'bouteille-multi-usage25kg': ['multi usage', 'multiusage', '25kg', '25 kg'],
};

// Un alias qui commence par un chiffre ne doit pas être précédé d'un autre
// chiffre (« 6 kg » ne doit pas correspondre à « 16 kg »).
function hasAlias(question, alias) {
  let from = question.indexOf(alias);
  while (from !== -1) {
    const before = question[from - 1];
    if (!/\d/.test(alias[0]) || !before || !/[\d.]/.test(before)) return true;
    from = question.indexOf(alias, from + 1);
  }
  return false;
}

// Garde les produits qui correspondent au plus grand nombre d'indices
// (« enora 6kg » : Enora de 6Kg l'emporte sur les autres bouteilles de 6 kg).
function findProducts(question) {
  const scored = boutiqueProducts
    .map((p) => ({ p, score: (PRODUCT_ALIASES[p.slug] ?? []).filter((a) => hasAlias(question, a)).length }))
    .filter((x) => x.score > 0);
  const best = Math.max(0, ...scored.map((x) => x.score));
  const exact = scored.filter((x) => x.score === best).map((x) => x.p);
  if (exact.length) return exact;
  // Seulement la marque (« vos bouteilles Enora ») : toute la gamme.
  const brand = ['enora', 'sodigaz'].find((b) => question.includes(b));
  return brand ? boutiqueProducts.filter((p) => p.brand === brand) : [];
}

function productReply(products, lang) {
  if (products.length === 1) {
    const p = products[0];
    return {
      text:
        lang === 'en'
          ? `${p.name} costs ${p.price}.\n${pickLang(p.description, lang)}`
          : `${p.name} est à ${p.price}.\n${pickLang(p.description, lang)}`,
      links: [
        link(lang === 'en' ? 'View the product' : 'Voir le produit', `/produits/${p.slug}`),
        link(lang === 'en' ? 'Request information' : 'Demander une information', `/devis?produit=${p.slug}`),
      ],
    };
  }
  const lines = products.map((p) => `• ${p.name} : ${p.price}`).join('\n');
  return {
    text: (lang === 'en' ? 'Here are the matching products:\n' : 'Voici les produits correspondants :\n') + lines,
    links: products.slice(0, 3).map((p) => link(p.name, `/produits/${p.slug}`)),
  };
}

function findStationCity(question) {
  const cities = [...new Set(stations.map((s) => s.city))];
  const byCity = cities.find((city) => question.includes(normalize(city)));
  if (byCity) return stations.filter((s) => s.city === byCity);
  // Quartiers de Lomé cités dans le nom de la station (Agoè, Ramatou...).
  const byName = stations.filter((s) => {
    const name = normalize(s.name).replace('oasis ', '');
    return name.length > 3 && question.includes(name);
  });
  return byName.length ? byName : null;
}

function stationReply(list, lang) {
  const lines = list.map((s) => `• ${s.name} — ${s.address} (${s.phone})`).join('\n');
  return {
    text:
      (lang === 'en'
        ? `We have ${list.length > 1 ? `${list.length} stations` : 'a station'} there:\n`
        : `Nous y avons ${list.length > 1 ? `${list.length} stations` : 'une station'} :\n`) + lines,
    links: [
      ...list.slice(0, 2).map((s) => link(s.name, `/stations/${s.id}`)),
      link(lang === 'en' ? 'Station map' : 'Carte des stations', '/stations'),
    ],
  };
}

/* ---------- Sujets ---------- */

const cityList = [...new Set(stations.map((s) => s.city))].join(', ');

const INTENTS = [
  {
    id: 'greeting',
    keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'hi', 'hey', 'coucou', 'good morning'],
    answer: (lang) => ({
      text: L(
        'Bonjour ! Je suis l’assistant ZENER. Je peux vous renseigner sur nos produits gaz et leurs prix, nos stations Oasis, la ZenCard, nos coordonnées ou nos offres d’emploi. Que souhaitez-vous savoir ?',
        'Hello! I’m the ZENER assistant. I can help with our gas products and prices, our Oasis stations, the ZenCard, our contact details or our job offers. What would you like to know?'
      )[lang],
    }),
  },
  {
    id: 'thanks',
    keywords: ['merci', 'thank', 'thanks', 'super', 'parfait', 'genial', 'top'],
    answer: (lang) => ({
      text: L(
        'Avec plaisir ! Si vous avez une autre question, je suis là.',
        'You’re welcome! If you have another question, I’m here.'
      )[lang],
    }),
  },
  {
    id: 'hours',
    keywords: ['horaire', 'heure', 'ouvert', 'ouverture', 'ferme', 'fermeture', 'samedi', 'dimanche', 'weekend', 'week end', 'open', 'hours', 'closing'],
    answer: (lang) => ({
      text: L(
        `Nos bureaux sont ouverts ${CONTACT.hours.fr}. Les stations Oasis disposent d’un self-service 24 h/24 accessible avec la ZenCard.`,
        `Our offices are open ${CONTACT.hours.en}. Oasis stations offer 24/7 self-service with the ZenCard.`
      )[lang],
      links: [link(lang === 'en' ? 'Contact us' : 'Nous contacter', '/contact')],
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'joindre', 'telephone', 'tel', 'appeler', 'appel', 'numero', 'email', 'mail', 'adresse', 'siege', 'bureau', 'ecrire', 'phone', 'call', 'address', 'reach', 'conseiller', 'advisor'],
    answer: (lang) => ({
      text: L(
        `Vous pouvez nous joindre :\n• Téléphone : ${CONTACT.phone}\n• E-mail : ${CONTACT.email}\n• Adresse : ${CONTACT.address.fr}\n• Horaires : ${CONTACT.hours.fr}\nVous pouvez aussi nous écrire via le formulaire de la page Contact.`,
        `You can reach us:\n• Phone: ${CONTACT.phone}\n• Email: ${CONTACT.email}\n• Address: ${CONTACT.address.en}\n• Hours: ${CONTACT.hours.en}\nYou can also write to us using the form on the Contact page.`
      )[lang],
      links: [link(lang === 'en' ? 'Contact form' : 'Formulaire de contact', '/contact')],
    }),
  },
  {
    id: 'zencard',
    keywords: ['zencard', 'zen card', 'carte', 'card', 'recharge', 'recharger', 'plafond', 'solde', 'cni', 'top up'],
    answer: (lang) => ({
      text: L(
        'La ZenCard est la carte de paiement carburant de ZENER, pour les particuliers comme pour les entreprises et les flottes : paiement rapide, plafonds paramétrables, historique des transactions et accès au self-service 24 h/24 en station.\nPour l’obtenir : remplissez la demande sur la page ZenCard, notre équipe la valide, puis vous récupérez votre carte dans la station choisie avec une pièce d’identité. La recharge se fait en station.',
        'The ZenCard is ZENER’s fuel payment card, for individuals as well as businesses and fleets: fast payment, configurable limits, transaction history and access to 24/7 self-service at stations.\nTo get one: fill in the request on the ZenCard page, our team validates it, then you pick up your card at the station of your choice with an ID. Top-ups are done at the station.'
      )[lang],
      links: [link(lang === 'en' ? 'Request a ZenCard' : 'Demander ma ZenCard', '/zencard')],
    }),
  },
  {
    id: 'stations',
    keywords: ['station', 'oasis', 'proche', 'itineraire', 'plein', 'ou trouver', 'ou etes', 'localiser', 'map', 'carte des', 'nearest', 'where'],
    answer: (lang) => ({
      text: L(
        `Notre réseau compte ${stations.length} stations Oasis au Togo, à ${cityList}. La page Stations affiche la carte interactive avec l’adresse, le téléphone et l’itinéraire de chacune. Dites-moi votre ville et je vous indique la station la plus proche.`,
        `Our network has ${stations.length} Oasis stations in Togo, in ${cityList}. The Stations page shows the interactive map with the address, phone number and directions for each one. Tell me your city and I’ll point you to the nearest station.`
      )[lang],
      links: [link(lang === 'en' ? 'Station map' : 'Carte des stations', '/stations')],
    }),
  },
  {
    id: 'order',
    keywords: ['commande', 'commander', 'panier', 'livraison', 'livrer', 'payer', 'paiement', 'mobile money', 'acheter', 'achat', 'order', 'cart', 'delivery', 'buy', 'pay'],
    answer: (lang) => ({
      text: L(
        'Pour commander : ouvrez la fiche du produit depuis le catalogue, cliquez sur « Ajouter au panier », puis validez votre commande depuis le panier. Vous pouvez choisir le retrait en station ou la livraison à domicile, et payer à la livraison / en station ou par Mobile Money. Notre équipe vous rappelle pour confirmer.',
        'To order: open the product page from the catalog, click “Add to cart”, then confirm your order from the cart. You can choose station pickup or home delivery, and pay on delivery / at the station or by Mobile Money. Our team will call you to confirm.'
      )[lang],
      links: [
        link(lang === 'en' ? 'Catalog' : 'Catalogue', '/produits'),
        link(lang === 'en' ? 'My cart' : 'Mon panier', '/panier'),
      ],
    }),
  },
  {
    id: 'fuels',
    keywords: ['essence', 'gasoil', 'gazole', 'diesel', 'super', 'xtraline', 'xtrazole', 'carburant', 'fuel', 'petrol'],
    answer: (lang) => ({
      text: L(
        'ZENER distribue ses carburants dans son réseau de stations Oasis : XtraLine pour les moteurs essence et XtraZole pour les moteurs diesel, développés pour la performance et la protection des moteurs. Les prix à la pompe sont affichés en station.',
        'ZENER distributes its fuels through its Oasis station network: XtraLine for petrol engines and XtraZole for diesel engines, designed for engine performance and protection. Pump prices are displayed at the station.'
      )[lang],
      links: [link(lang === 'en' ? 'Our stations' : 'Nos stations', '/stations')],
    }),
  },
  {
    id: 'products',
    keywords: ['gaz', 'gas', 'bouteille', 'produit', 'prix', 'tarif', 'cout', 'combien', 'catalogue', 'boutique', 'kg', 'butane', 'sodigaz', 'enora', 'consigne', 'accessoire', 'price', 'product', 'cylinder', 'shop'],
    answer: (lang) => ({
      text:
        (lang === 'en'
          ? 'Here are our gas cylinders (Sodigaz and Enora brands):\n'
          : 'Voici nos bouteilles de gaz (marques Sodigaz et Enora) :\n') +
        boutiqueProducts.map((p) => `• ${p.name} : ${p.price}`).join('\n') +
        (lang === 'en'
          ? '\nAsk me about a specific cylinder for more details.'
          : '\nDemandez-moi une bouteille en particulier pour plus de détails.'),
      links: [link(lang === 'en' ? 'See the catalog' : 'Voir le catalogue', '/produits')],
    }),
  },
  {
    id: 'lubricants',
    keywords: ['lubrifiant', 'huile', 'vidange', 'lubricant', 'oil'],
    answer: (lang) => ({
      text: L(
        'ZENER propose une gamme de lubrifiants et d’accessoires sélectionnés pour la performance, la durabilité et la protection des équipements. Pour connaître la gamme disponible, adressez-vous à votre station Oasis ou à notre équipe commerciale.',
        'ZENER offers a range of lubricants and accessories selected for the performance, durability and protection of equipment. To find out what is available, ask at your Oasis station or contact our sales team.'
      )[lang],
      links: [link(lang === 'en' ? 'Request a quote' : 'Demander un devis', '/devis')],
    }),
  },
  {
    id: 'careers',
    keywords: ['emploi', 'recrut', 'job', 'stage', 'carriere', 'postuler', 'candidat', 'cv', 'travailler', 'embauche', 'career', 'hiring', 'internship', 'apply', 'work'],
    answer: (lang) => {
      const active = offres.filter((o) => o.actif);
      const list = active
        .map((o) => `• ${pickLang(o.titre, lang)} — ${pickLang(o.type_contrat, lang)}, ${o.ville}`)
        .join('\n');
      return {
        text:
          (lang === 'en'
            ? `We currently have ${active.length} open positions:\n`
            : `Nous avons actuellement ${active.length} offres ouvertes :\n`) +
          list +
          (lang === 'en'
            ? '\nYou can also send an unsolicited application from the Careers page.'
            : '\nVous pouvez aussi envoyer une candidature spontanée depuis la page Carrières.'),
        links: [link(lang === 'en' ? 'See the offers' : 'Voir les offres', '/carrieres')],
      };
    },
  },
  {
    id: 'complaint',
    keywords: ['reclamation', 'plainte', 'probleme', 'litige', 'souci', 'insatisfait', 'complaint', 'issue', 'problem'],
    answer: (lang) => ({
      text: L(
        'Désolé pour ce désagrément. Pour déposer une réclamation, connectez-vous à votre Portail client puis ouvrez « Mes réclamations » : vous pourrez suivre son traitement jusqu’à sa résolution. Vous pouvez aussi nous appeler au ' + CONTACT.phone + '.',
        'Sorry for the inconvenience. To file a complaint, log in to your Client Portal and open “My complaints”: you can track it until it is resolved. You can also call us on ' + CONTACT.phone + '.'
      )[lang],
      links: [link(lang === 'en' ? 'Client Portal' : 'Portail client', '/portail-client/connexion')],
    }),
  },
  {
    id: 'account',
    keywords: ['compte', 'inscription', 'inscrire', 'connexion', 'connecter', 'mot de passe', 'portail', 'espace client', 'account', 'login', 'sign up', 'password'],
    answer: (lang) => ({
      text: L(
        'Votre Espace client (icône de profil en haut de page) vous permet de suivre vos ZenCards, vos transactions et vos réclamations. Créez un compte en quelques secondes si vous n’en avez pas encore.',
        'Your Client Area (profile icon at the top of the page) lets you track your ZenCards, transactions and complaints. Create an account in a few seconds if you don’t have one yet.'
      )[lang],
      links: [link(lang === 'en' ? 'Log in' : 'Se connecter', '/portail-client/connexion')],
    }),
  },
  {
    id: 'b2b',
    keywords: ['entreprise', 'professionnel', 'b2b', 'flotte', 'pme', 'industriel', 'horeca', 'hotel', 'restaurant', 'devis', 'gas to power', 'soute', 'maritime', 'aviation', 'navire', 'business', 'company', 'fleet', 'quote'],
    answer: (lang) => ({
      text: L(
        'ZENER accompagne les entreprises, PME, industriels, HORECA, flottes et institutions : approvisionnement en carburant et en gaz, ZenCard pour piloter les dépenses de flotte, Gaz-to-Power pour sécuriser la production électrique, soute maritime (livraison de carburant aux navires) et ZenMobility (livraison de carburant). Décrivez votre besoin dans une demande de devis : notre équipe commerciale revient vers vous.',
        'ZENER supports businesses, SMEs, industrial companies, HORECA, fleets and institutions: fuel and gas supply, the ZenCard to manage fleet spending, Gas-to-Power to secure power generation, marine bunkering (fuel delivery to ships) and ZenMobility (fuel delivery). Describe your needs in a quote request: our sales team will get back to you.'
      )[lang],
      links: [
        link(lang === 'en' ? 'Request a quote' : 'Demander un devis', '/devis'),
        link(lang === 'en' ? 'Our businesses' : 'Nos métiers', '/services'),
      ],
    }),
  },
  {
    id: 'group',
    keywords: ['zener', 'groupe', 'qui etes', 'presentation', 'histoire', 'pays', 'implante', 'present', 'togo', 'benin', 'guinee', 'bissau', 'filiale', 'zengrupo', 'pls', 'pgs', 'valeur', 'limm', 'vision', 'mission', 'about', 'group', 'who are', 'countries'],
    answer: (lang) => ({
      text: L(
        'ZENER est un groupe énergétique africain, ancré au Togo et présent au Bénin et en Guinée-Bissau. Ses 5 métiers : distribution de carburants, gaz / énergie, mobilité & services, lubrifiants et solutions B2B. Le Groupe s’appuie sur ses filiales Zener Togo, Zener Benin, ZenGrupo, PLS et PGS, et sur ses valeurs LIMM : Liberté, Innovation, Modernité, Mobilité. 15 ans d’expérience et 600 collaborateurs.',
        'ZENER is an African energy group, rooted in Togo and present in Benin and Guinea-Bissau. Its 5 businesses: fuel distribution, gas / energy, mobility & services, lubricants and B2B solutions. The Group relies on its subsidiaries Zener Togo, Zener Benin, ZenGrupo, PLS and PGS, and on its LIMM values: Freedom, Innovation, Modernity, Mobility. 15 years of experience and 600 employees.'
      )[lang],
      links: [link(lang === 'en' ? 'About the Group' : 'Découvrir le Groupe', '/a-propos')],
    }),
  },
  {
    id: 'rse',
    keywords: ['rse', 'environnement', 'securite', 'qhse', 'engagement', 'durable', 'social', 'csr', 'environment', 'safety'],
    answer: (lang) => ({
      text: L(
        'ZENER place l’humain, la sécurité et l’environnement au cœur de ses actions, autour de 4 axes : gouvernance et éthique, sensibilisation à la sécurité (GPL et carburants), amélioration des conditions de vie des communautés et préservation de l’environnement.',
        'ZENER puts people, safety and the environment at the heart of its actions, around 4 priorities: governance and ethics, safety awareness (LPG and fuel), improving community living conditions and protecting the environment.'
      )[lang],
      links: [link(lang === 'en' ? 'Our CSR policy' : 'Notre politique RSE', '/a-propos#politique-rse')],
    }),
  },
  {
    id: 'news',
    keywords: ['actualite', 'nouvelle', 'news', 'evenement', 'comite', 'ouverture', 'event'],
    answer: (lang) => ({
      text: L(
        'Dernières actualités : le premier Comité Exécutif du Groupe Zener (10 août 2026) et l’ouverture de la 11ᵉ Oasis Zener à Atakpamé (2 juillet 2026).',
        'Latest news: the Zener Group’s first Executive Committee (August 10, 2026) and the opening of the 11th Zener Oasis in Atakpamé (July 2, 2026).'
      )[lang],
      links: [link(lang === 'en' ? 'All news' : 'Toutes les actualités', '/actualites')],
    }),
  },
];

function fallback(lang) {
  return {
    text: L(
      'Je n’ai pas bien saisi votre question. Je peux vous renseigner sur :\n• nos produits gaz et leurs prix\n• nos stations Oasis\n• la ZenCard\n• nos coordonnées et horaires\n• nos offres d’emploi\nVous pouvez aussi joindre un conseiller au ' + CONTACT.phone + '.',
      'I didn’t quite get your question. I can help with:\n• our gas products and prices\n• our Oasis stations\n• the ZenCard\n• our contact details and hours\n• our job offers\nYou can also reach an advisor on ' + CONTACT.phone + '.'
    )[lang],
    links: [link(lang === 'en' ? 'Contact an advisor' : 'Parler à un conseiller', '/contact')],
  };
}

export function answer(text, rawLang) {
  const lang = rawLang?.startsWith('en') ? 'en' : 'fr';
  const question = normalize(text);
  const tokens = words(text);

  const products = findProducts(question);
  if (products.length) return productReply(products, lang);

  const scored = INTENTS.map((intent) => ({
    intent,
    score: hits(question, tokens, intent.keywords) + (intent.id === 'products' && /\d\s?kg/.test(question) ? 1 : 0),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const cityStations = findStationCity(question);
  const top = scored[0]?.intent.id;
  // « station à Kara », « vous êtes où à Kpalimé ? » : réponse par ville.
  if (cityStations && (!top || ['stations', 'contact', 'hours', 'group'].includes(top))) {
    return stationReply(cityStations, lang);
  }

  if (!scored.length) return fallback(lang);

  // Une simple salutation suivie d'une vraie question : on répond à la question.
  const best = scored.find((s) => s.intent.id !== 'greeting' && s.intent.id !== 'thanks') ?? scored[0];
  const reply = best.intent.answer(lang);
  return { links: [], ...reply };
}

const quickQuestions = {
  fr: [
    'Quels produits gaz proposez-vous ?',
    'Comment obtenir ma ZenCard ?',
    'Où se trouvent vos stations ?',
    'Comment vous contacter ?',
  ],
  en: [
    'What gas products do you offer?',
    'How do I get my ZenCard?',
    'Where are your stations?',
    'How can I contact you?',
  ],
};

export function getQuickQuestions(lang) {
  return quickQuestions[lang?.startsWith('en') ? 'en' : 'fr'];
}

// Petit délai pour l'indicateur « en train d'écrire », proportionnel à la
// longueur de la réponse (plafonné), pour un échange plus naturel.
export function sendMessage(text, lang) {
  const reply = answer(text, lang);
  const delay = Math.min(1200, 450 + reply.text.length * 2);
  return new Promise((resolve) => {
    setTimeout(() => resolve(reply), delay);
  });
}
