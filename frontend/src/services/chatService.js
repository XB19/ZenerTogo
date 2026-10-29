/**
 * Assistant ZENER : répond aux questions des visiteurs à partir des données
 * du site (coordonnées, stations, produits, ZenCard, offres d'emploi...),
 * en français, anglais ou portugais selon la langue active du site.
 *
 * Fonctionne entièrement côté navigateur, sans service externe : la
 * question est normalisée (minuscules, sans accents), on cherche d'abord
 * un produit ou une ville précise, puis le sujet dont les mots-clés (dans
 * les trois langues) correspondent le mieux. Chaque réponse renvoie
 * `{ text, links }` ; les liens sont affichés comme boutons vers la page
 * concernée.
 *
 * C'est le seul endroit à modifier pour brancher plus tard un backend de
 * conversation : garder la signature sendMessage(text, lang) -> Promise.
 */
import { boutiqueProducts, offres } from '../data/mockData.js';
import { stations } from '../data/stations.js';
import { baseLang, pickLang } from '../utils/i18nData.js';

const CONTACT = {
  phone: '+228 22 27 20 00',
  email: 'info@zener.tg',
  address: {
    fr: "Zone industrielle de Lomé, route d'Aného — 08 BP 8535 Lomé, Togo",
    en: 'Lomé Industrial Zone, Aného road — 08 BP 8535 Lomé, Togo',
    pt: 'Zona industrial de Lomé, estrada de Aného — 08 BP 8535 Lomé, Togo',
  },
  hours: {
    fr: 'du lundi au vendredi de 8 h à 16 h 45 (fermé le samedi et le dimanche)',
    en: 'Monday to Friday, 8 am to 4:45 pm (closed on Saturday and Sunday)',
    pt: 'de segunda a sexta, das 8h00 às 16h45 (encerrado ao sábado e ao domingo)',
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

const link = (label, to) => ({ label, to });

// Libellés des boutons, réutilisés par plusieurs réponses.
const LABELS = {
  viewProduct: { fr: 'Voir le produit', en: 'View the product', pt: 'Ver o produto' },
  requestInfo: { fr: 'Demander une information', en: 'Request information', pt: 'Pedir informações' },
  stationMap: { fr: 'Carte des stations', en: 'Station map', pt: 'Mapa dos postos' },
  contactUs: { fr: 'Nous contacter', en: 'Contact us', pt: 'Contacte-nos' },
  contactForm: { fr: 'Formulaire de contact', en: 'Contact form', pt: 'Formulário de contacto' },
  requestZencard: { fr: 'Demander ma ZenCard', en: 'Request a ZenCard', pt: 'Pedir o meu ZenCard' },
  catalog: { fr: 'Catalogue', en: 'Catalog', pt: 'Catálogo' },
  myCart: { fr: 'Mon panier', en: 'My cart', pt: 'O meu carrinho' },
  ourStations: { fr: 'Nos stations', en: 'Our stations', pt: 'Os nossos postos' },
  seeCatalog: { fr: 'Voir le catalogue', en: 'See the catalog', pt: 'Ver o catálogo' },
  requestQuote: { fr: 'Demander un devis', en: 'Request a quote', pt: 'Pedir um orçamento' },
  seeOffers: { fr: 'Voir les offres', en: 'See the offers', pt: 'Ver as ofertas' },
  clientPortal: { fr: 'Portail client', en: 'Client Portal', pt: 'Portal do cliente' },
  login: { fr: 'Se connecter', en: 'Log in', pt: 'Iniciar sessão' },
  ourBusinesses: { fr: 'Nos métiers', en: 'Our businesses', pt: 'As nossas áreas de negócio' },
  aboutGroup: { fr: 'Découvrir le Groupe', en: 'About the Group', pt: 'Conhecer o Grupo' },
  csr: { fr: 'Notre politique RSE', en: 'Our CSR policy', pt: 'A nossa política de RSE' },
  allNews: { fr: 'Toutes les actualités', en: 'All news', pt: 'Todas as notícias' },
  advisor: { fr: 'Parler à un conseiller', en: 'Contact an advisor', pt: 'Falar com um conselheiro' },
};

/* ---------- Détecteurs précis : produit, ville ---------- */

const PRODUCT_ALIASES = {
  'la-petite-butane-sikavi-6kg': ['sikavi', 'petite butane', '6kg', '6 kg'],
  'evalu-50kg': ['evalu', '50kg', '50 kg'],
  'enora-de-6kg': ['enora 6', 'enora de 6', '6kg', '6 kg'],
  'enora-de-125kg': ['enora 12', 'enora de 12', '12.5'],
  abire: ['abire', '12.5'],
  'aboe-nomou-6kg-robinet': ['aboe', 'nomou', 'robinet', 'torneira', '6kg', '6 kg'],
  'apefa-3-kg': ['apefa', '3kg', '3 kg'],
  'bouteille-multi-usage25kg': ['multi usage', 'multiusage', 'multiusos', '25kg', '25 kg'],
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
    const intro = { fr: `${p.name} est à ${p.price}.`, en: `${p.name} costs ${p.price}.`, pt: `${p.name} custa ${p.price}.` };
    return {
      text: `${intro[lang]}\n${pickLang(p.description, lang)}`,
      links: [
        link(LABELS.viewProduct[lang], `/produits/${p.slug}`),
        link(LABELS.requestInfo[lang], `/devis?produit=${p.slug}`),
      ],
    };
  }
  const intro = {
    fr: 'Voici les produits correspondants :',
    en: 'Here are the matching products:',
    pt: 'Eis os produtos correspondentes:',
  };
  return {
    text: `${intro[lang]}\n` + products.map((p) => `• ${p.name} : ${p.price}`).join('\n'),
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
  const many = list.length > 1;
  const intro = {
    fr: `Nous y avons ${many ? `${list.length} stations` : 'une station'} :`,
    en: `We have ${many ? `${list.length} stations` : 'a station'} there:`,
    pt: `Temos ${many ? `${list.length} postos` : 'um posto'} nessa localidade:`,
  };
  return {
    text: `${intro[lang]}\n` + list.map((s) => `• ${s.name} — ${s.address} (${s.phone})`).join('\n'),
    links: [...list.slice(0, 2).map((s) => link(s.name, `/stations/${s.id}`)), link(LABELS.stationMap[lang], '/stations')],
  };
}

/* ---------- Sujets ---------- */

const cityList = [...new Set(stations.map((s) => s.city))].join(', ');

const INTENTS = [
  {
    id: 'greeting',
    keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'hi', 'hey', 'coucou', 'good morning', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
    answer: () => ({
      text: {
        fr: 'Bonjour ! Je suis l’assistant ZENER. Je peux vous renseigner sur nos produits gaz et leurs prix, nos stations Oasis, la ZenCard, nos coordonnées ou nos offres d’emploi. Que souhaitez-vous savoir ?',
        en: 'Hello! I’m the ZENER assistant. I can help with our gas products and prices, our Oasis stations, the ZenCard, our contact details or our job offers. What would you like to know?',
        pt: 'Olá! Sou o assistente ZENER. Posso informá-lo sobre os nossos produtos de gás e os seus preços, os nossos postos Oasis, o ZenCard, os nossos contactos ou as nossas ofertas de emprego. O que gostaria de saber?',
      },
    }),
  },
  {
    id: 'thanks',
    keywords: ['merci', 'thank', 'thanks', 'super', 'parfait', 'genial', 'top', 'obrigad', 'perfeito'],
    answer: () => ({
      text: {
        fr: 'Avec plaisir ! Si vous avez une autre question, je suis là.',
        en: 'You’re welcome! If you have another question, I’m here.',
        pt: 'Com todo o gosto! Se tiver outra pergunta, estou aqui.',
      },
    }),
  },
  {
    id: 'hours',
    keywords: ['horaire', 'heure', 'ouvert', 'ouverture', 'ferme', 'fermeture', 'samedi', 'dimanche', 'weekend', 'week end', 'open', 'hours', 'closing', 'horario', 'aberto', 'abre', 'fecha', 'sabado', 'domingo'],
    answer: (lang) => ({
      text: {
        fr: `Nos bureaux sont ouverts ${CONTACT.hours.fr}. Les stations Oasis disposent d’un self-service 24 h/24 accessible avec la ZenCard.`,
        en: `Our offices are open ${CONTACT.hours.en}. Oasis stations offer 24/7 self-service with the ZenCard.`,
        pt: `Os nossos escritórios estão abertos ${CONTACT.hours.pt}. Os postos Oasis dispõem de self-service 24 h/24 acessível com o ZenCard.`,
      },
      links: [link(LABELS.contactUs[lang], '/contact')],
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'joindre', 'telephone', 'tel', 'appeler', 'appel', 'numero', 'email', 'mail', 'adresse', 'siege', 'bureau', 'ecrire', 'phone', 'call', 'address', 'reach', 'conseiller', 'advisor', 'contacto', 'contactar', 'telefone', 'ligar', 'morada', 'endereco', 'escritorio', 'sede'],
    answer: (lang) => ({
      text: {
        fr: `Vous pouvez nous joindre :\n• Téléphone : ${CONTACT.phone}\n• E-mail : ${CONTACT.email}\n• Adresse : ${CONTACT.address.fr}\n• Horaires : ${CONTACT.hours.fr}\nVous pouvez aussi nous écrire via le formulaire de la page Contact.`,
        en: `You can reach us:\n• Phone: ${CONTACT.phone}\n• Email: ${CONTACT.email}\n• Address: ${CONTACT.address.en}\n• Hours: ${CONTACT.hours.en}\nYou can also write to us using the form on the Contact page.`,
        pt: `Pode contactar-nos:\n• Telefone: ${CONTACT.phone}\n• E-mail: ${CONTACT.email}\n• Morada: ${CONTACT.address.pt}\n• Horário: ${CONTACT.hours.pt}\nPode também escrever-nos através do formulário da página Contacto.`,
      },
      links: [link(LABELS.contactForm[lang], '/contact')],
    }),
  },
  {
    id: 'zencard',
    keywords: ['zencard', 'zen card', 'carte', 'card', 'recharge', 'recharger', 'plafond', 'solde', 'cni', 'top up', 'cartao', 'carregar', 'carregamento', 'saldo', 'limite'],
    answer: (lang) => ({
      text: {
        fr: 'La ZenCard est la carte de paiement carburant de ZENER, pour les particuliers comme pour les entreprises et les flottes : paiement rapide, plafonds paramétrables, historique des transactions et accès au self-service 24 h/24 en station.\nPour l’obtenir : remplissez la demande sur la page ZenCard, notre équipe la valide, puis vous récupérez votre carte dans la station choisie avec une pièce d’identité. La recharge se fait en station.',
        en: 'The ZenCard is ZENER’s fuel payment card, for individuals as well as businesses and fleets: fast payment, configurable limits, transaction history and access to 24/7 self-service at stations.\nTo get one: fill in the request on the ZenCard page, our team validates it, then you pick up your card at the station of your choice with an ID. Top-ups are done at the station.',
        pt: 'O ZenCard é o cartão de pagamento de combustível da ZENER, para particulares, empresas e frotas: pagamento rápido, limites configuráveis, histórico das transações e acesso ao self-service 24 h/24 nos postos.\nPara o obter: preencha o pedido na página ZenCard, a nossa equipa valida-o e depois levanta o seu cartão no posto escolhido com um documento de identificação. O carregamento é feito no posto.',
      },
      links: [link(LABELS.requestZencard[lang], '/zencard')],
    }),
  },
  {
    id: 'stations',
    keywords: ['station', 'oasis', 'proche', 'itineraire', 'plein', 'ou trouver', 'ou etes', 'localiser', 'map', 'carte des', 'nearest', 'where', 'posto', 'postos', 'onde', 'perto', 'proximo', 'itinerario', 'abastecer'],
    answer: (lang) => ({
      text: {
        fr: `Notre réseau compte ${stations.length} stations Oasis au Togo, à ${cityList}. La page Stations affiche la carte interactive avec l’adresse, le téléphone et l’itinéraire de chacune. Dites-moi votre ville et je vous indique la station la plus proche.`,
        en: `Our network has ${stations.length} Oasis stations in Togo, in ${cityList}. The Stations page shows the interactive map with the address, phone number and directions for each one. Tell me your city and I’ll point you to the nearest station.`,
        pt: `A nossa rede conta com ${stations.length} postos Oasis no Togo, em ${cityList}. A página Postos mostra o mapa interativo com a morada, o telefone e o itinerário de cada um. Diga-me a sua cidade e indico-lhe o posto mais próximo.`,
      },
      links: [link(LABELS.stationMap[lang], '/stations')],
    }),
  },
  {
    id: 'order',
    keywords: ['commande', 'commander', 'panier', 'livraison', 'livrer', 'payer', 'paiement', 'mobile money', 'acheter', 'achat', 'order', 'cart', 'delivery', 'buy', 'pay', 'encomenda', 'encomendar', 'carrinho', 'entrega', 'entregar', 'pagar', 'pagamento', 'comprar', 'compra'],
    answer: (lang) => ({
      text: {
        fr: 'Pour commander : ouvrez la fiche du produit depuis le catalogue, cliquez sur « Ajouter au panier », puis validez votre commande depuis le panier. Vous pouvez choisir le retrait en station ou la livraison à domicile, et payer à la livraison / en station ou par Mobile Money. Notre équipe vous rappelle pour confirmer.',
        en: 'To order: open the product page from the catalog, click “Add to cart”, then confirm your order from the cart. You can choose station pickup or home delivery, and pay on delivery / at the station or by Mobile Money. Our team will call you to confirm.',
        pt: 'Para encomendar: abra a ficha do produto a partir do catálogo, clique em «Adicionar ao carrinho» e confirme a sua encomenda a partir do carrinho. Pode escolher o levantamento no posto ou a entrega ao domicílio, e pagar na entrega / no posto ou por Mobile Money. A nossa equipa liga-lhe para confirmar.',
      },
      links: [link(LABELS.catalog[lang], '/produits'), link(LABELS.myCart[lang], '/panier')],
    }),
  },
  {
    id: 'fuels',
    keywords: ['essence', 'gasoil', 'gazole', 'diesel', 'super', 'xtraline', 'xtrazole', 'carburant', 'fuel', 'petrol', 'combustivel', 'combustiveis', 'gasolina', 'gasoleo'],
    answer: (lang) => ({
      text: {
        fr: 'ZENER distribue ses carburants dans son réseau de stations Oasis : XtraLine pour les moteurs essence et XtraZole pour les moteurs diesel, développés pour la performance et la protection des moteurs. Les prix à la pompe sont affichés en station.',
        en: 'ZENER distributes its fuels through its Oasis station network: XtraLine for petrol engines and XtraZole for diesel engines, designed for engine performance and protection. Pump prices are displayed at the station.',
        pt: 'A ZENER distribui os seus combustíveis na sua rede de postos Oasis: XtraLine para motores a gasolina e XtraZole para motores a gasóleo, desenvolvidos para o desempenho e a proteção dos motores. Os preços na bomba estão afixados no posto.',
      },
      links: [link(LABELS.ourStations[lang], '/stations')],
    }),
  },
  {
    id: 'products',
    keywords: ['gaz', 'gas', 'bouteille', 'produit', 'prix', 'tarif', 'cout', 'combien', 'catalogue', 'boutique', 'kg', 'butane', 'sodigaz', 'enora', 'consigne', 'accessoire', 'price', 'product', 'cylinder', 'shop', 'garrafa', 'botija', 'produto', 'preco', 'quanto', 'custa', 'catalogo', 'loja', 'acessorio'],
    answer: (lang) => {
      const intro = {
        fr: 'Voici nos bouteilles de gaz (marques Sodigaz et Enora) :',
        en: 'Here are our gas cylinders (Sodigaz and Enora brands):',
        pt: 'Eis as nossas garrafas de gás (marcas Sodigaz e Enora):',
      };
      const outro = {
        fr: 'Demandez-moi une bouteille en particulier pour plus de détails.',
        en: 'Ask me about a specific cylinder for more details.',
        pt: 'Pergunte-me por uma garrafa em particular para mais detalhes.',
      };
      return {
        text: `${intro[lang]}\n${boutiqueProducts.map((p) => `• ${p.name} : ${p.price}`).join('\n')}\n${outro[lang]}`,
        links: [link(LABELS.seeCatalog[lang], '/produits')],
      };
    },
  },
  {
    id: 'lubricants',
    keywords: ['lubrifiant', 'huile', 'vidange', 'lubricant', 'oil', 'lubrificante', 'oleo', 'mudanca de oleo'],
    answer: (lang) => ({
      text: {
        fr: 'ZENER propose une gamme de lubrifiants et d’accessoires sélectionnés pour la performance, la durabilité et la protection des équipements. Pour connaître la gamme disponible, adressez-vous à votre station Oasis ou à notre équipe commerciale.',
        en: 'ZENER offers a range of lubricants and accessories selected for the performance, durability and protection of equipment. To find out what is available, ask at your Oasis station or contact our sales team.',
        pt: 'A ZENER propõe uma gama de lubrificantes e acessórios selecionados para o desempenho, a durabilidade e a proteção dos equipamentos. Para conhecer a gama disponível, dirija-se ao seu posto Oasis ou à nossa equipa comercial.',
      },
      links: [link(LABELS.requestQuote[lang], '/devis')],
    }),
  },
  {
    id: 'careers',
    keywords: ['emploi', 'recrut', 'job', 'stage', 'carriere', 'postuler', 'candidat', 'cv', 'travailler', 'embauche', 'career', 'hiring', 'internship', 'apply', 'work', 'emprego', 'vaga', 'estagio', 'carreira', 'trabalhar', 'trabalho', 'recrutamento'],
    answer: (lang) => {
      const active = offres.filter((o) => o.actif);
      const intro = {
        fr: `Nous avons actuellement ${active.length} offres ouvertes :`,
        en: `We currently have ${active.length} open positions:`,
        pt: `Temos atualmente ${active.length} ofertas abertas:`,
      };
      const outro = {
        fr: 'Vous pouvez aussi envoyer une candidature spontanée depuis la page Carrières.',
        en: 'You can also send an unsolicited application from the Careers page.',
        pt: 'Pode também enviar uma candidatura espontânea a partir da página Carreiras.',
      };
      const list = active
        .map((o) => `• ${pickLang(o.titre, lang)} — ${pickLang(o.type_contrat, lang)}, ${o.ville}`)
        .join('\n');
      return { text: `${intro[lang]}\n${list}\n${outro[lang]}`, links: [link(LABELS.seeOffers[lang], '/carrieres')] };
    },
  },
  {
    id: 'complaint',
    keywords: ['reclamation', 'plainte', 'probleme', 'litige', 'souci', 'insatisfait', 'complaint', 'issue', 'problem', 'reclamacao', 'queixa', 'problema'],
    answer: (lang) => ({
      text: {
        fr: `Désolé pour ce désagrément. Pour déposer une réclamation, connectez-vous à votre Portail client puis ouvrez « Mes réclamations » : vous pourrez suivre son traitement jusqu’à sa résolution. Vous pouvez aussi nous appeler au ${CONTACT.phone}.`,
        en: `Sorry for the inconvenience. To file a complaint, log in to your Client Portal and open “My complaints”: you can track it until it is resolved. You can also call us on ${CONTACT.phone}.`,
        pt: `Lamentamos o incómodo. Para apresentar uma reclamação, inicie sessão no seu Portal do cliente e abra «As minhas reclamações»: poderá acompanhar o seu tratamento até à resolução. Pode também ligar-nos para o ${CONTACT.phone}.`,
      },
      links: [link(LABELS.clientPortal[lang], '/portail-client/connexion')],
    }),
  },
  {
    id: 'account',
    keywords: ['compte', 'inscription', 'inscrire', 'connexion', 'connecter', 'mot de passe', 'portail', 'espace client', 'account', 'login', 'sign up', 'password', 'conta', 'registo', 'registar', 'iniciar sessao', 'palavra passe', 'area de cliente'],
    answer: (lang) => ({
      text: {
        fr: 'Votre Espace client (icône de profil en haut de page) vous permet de suivre vos ZenCards, vos transactions et vos réclamations. Créez un compte en quelques secondes si vous n’en avez pas encore.',
        en: 'Your Client Area (profile icon at the top of the page) lets you track your ZenCards, transactions and complaints. Create an account in a few seconds if you don’t have one yet.',
        pt: 'A sua Área de cliente (ícone de perfil no topo da página) permite-lhe acompanhar os seus ZenCards, as suas transações e as suas reclamações. Crie uma conta em poucos segundos, se ainda não tiver uma.',
      },
      links: [link(LABELS.login[lang], '/portail-client/connexion')],
    }),
  },
  {
    id: 'b2b',
    keywords: ['entreprise', 'professionnel', 'b2b', 'flotte', 'pme', 'industriel', 'horeca', 'hotel', 'restaurant', 'devis', 'gas to power', 'soute', 'maritime', 'aviation', 'navire', 'business', 'company', 'fleet', 'quote', 'empresa', 'profissional', 'frota', 'industrial', 'orcamento', 'navio', 'aviacao'],
    answer: (lang) => ({
      text: {
        fr: 'ZENER accompagne les entreprises, PME, industriels, HORECA, flottes et institutions : approvisionnement en carburant et en gaz, ZenCard pour piloter les dépenses de flotte, Gaz-to-Power pour sécuriser la production électrique, soute maritime (livraison de carburant aux navires) et ZenMobility (livraison de carburant). Décrivez votre besoin dans une demande de devis : notre équipe commerciale revient vers vous.',
        en: 'ZENER supports businesses, SMEs, industrial companies, HORECA, fleets and institutions: fuel and gas supply, the ZenCard to manage fleet spending, Gas-to-Power to secure power generation, marine bunkering (fuel delivery to ships) and ZenMobility (fuel delivery). Describe your needs in a quote request: our sales team will get back to you.',
        pt: 'A ZENER acompanha empresas, PME, industriais, HORECA, frotas e instituições: abastecimento de combustível e gás, o ZenCard para gerir as despesas da frota, o Gas-to-Power para garantir a produção elétrica, o bunkering marítimo (fornecimento de combustível a navios) e o ZenMobility (entrega de combustível). Descreva a sua necessidade num pedido de orçamento: a nossa equipa comercial entrará em contacto consigo.',
      },
      links: [link(LABELS.requestQuote[lang], '/devis'), link(LABELS.ourBusinesses[lang], '/services')],
    }),
  },
  {
    id: 'group',
    keywords: ['zener', 'groupe', 'qui etes', 'presentation', 'histoire', 'pays', 'implante', 'present', 'togo', 'benin', 'guinee', 'bissau', 'filiale', 'zengrupo', 'pls', 'pgs', 'valeur', 'limm', 'vision', 'mission', 'about', 'group', 'who are', 'countries', 'grupo', 'quem sao', 'paises', 'filial', 'valores', 'visao', 'missao', 'guine'],
    answer: (lang) => ({
      text: {
        fr: 'ZENER est un groupe énergétique africain, ancré au Togo et présent au Bénin et en Guinée-Bissau. Ses 5 métiers : distribution de carburants, gaz / énergie, mobilité & services, lubrifiants et solutions B2B. Le Groupe s’appuie sur ses filiales Zener Togo, Zener Benin, ZenGrupo, PLS et PGS, et sur ses valeurs LIMM : Liberté, Innovation, Modernité, Mobilité. 15 ans d’expérience et 600 collaborateurs.',
        en: 'ZENER is an African energy group, rooted in Togo and present in Benin and Guinea-Bissau. Its 5 businesses: fuel distribution, gas / energy, mobility & services, lubricants and B2B solutions. The Group relies on its subsidiaries Zener Togo, Zener Benin, ZenGrupo, PLS and PGS, and on its LIMM values: Freedom, Innovation, Modernity, Mobility. 15 years of experience and 600 employees.',
        pt: 'A ZENER é um grupo energético africano, enraizado no Togo e presente no Benim e na Guiné-Bissau. As suas 5 áreas de negócio: distribuição de combustíveis, gás / energia, mobilidade e serviços, lubrificantes e soluções B2B. O Grupo apoia-se nas suas filiais Zener Togo, Zener Benin, ZenGrupo, PLS e PGS, e nos seus valores LIMM: Liberdade, Inovação, Modernidade, Mobilidade. 15 anos de experiência e 600 colaboradores.',
      },
      links: [link(LABELS.aboutGroup[lang], '/a-propos')],
    }),
  },
  {
    id: 'rse',
    keywords: ['rse', 'environnement', 'securite', 'qhse', 'engagement', 'durable', 'social', 'csr', 'environment', 'safety', 'ambiente', 'seguranca', 'sustentavel', 'compromisso'],
    answer: (lang) => ({
      text: {
        fr: 'ZENER place l’humain, la sécurité et l’environnement au cœur de ses actions, autour de 4 axes : gouvernance et éthique, sensibilisation à la sécurité (GPL et carburants), amélioration des conditions de vie des communautés et préservation de l’environnement.',
        en: 'ZENER puts people, safety and the environment at the heart of its actions, around 4 priorities: governance and ethics, safety awareness (LPG and fuel), improving community living conditions and protecting the environment.',
        pt: 'A ZENER coloca as pessoas, a segurança e o ambiente no centro das suas ações, em torno de 4 eixos: governação e ética, sensibilização para a segurança (GPL e combustíveis), melhoria das condições de vida das comunidades e preservação do ambiente.',
      },
      links: [link(LABELS.csr[lang], '/a-propos#politique-rse')],
    }),
  },
  {
    id: 'news',
    keywords: ['actualite', 'nouvelle', 'news', 'evenement', 'comite', 'ouverture', 'event', 'noticia', 'novidade', 'evento', 'abertura'],
    answer: (lang) => ({
      text: {
        fr: 'Dernières actualités : le premier Comité Exécutif du Groupe Zener (10 août 2026) et l’ouverture de la 11ᵉ Oasis Zener à Atakpamé (2 juillet 2026).',
        en: 'Latest news: the Zener Group’s first Executive Committee (August 10, 2026) and the opening of the 11th Zener Oasis in Atakpamé (July 2, 2026).',
        pt: 'Últimas notícias: o primeiro Comité Executivo do Grupo Zener (10 de agosto de 2026) e a abertura do 11.º Oasis Zener em Atakpamé (2 de julho de 2026).',
      },
      links: [link(LABELS.allNews[lang], '/actualites')],
    }),
  },
];

function fallback(lang) {
  const text = {
    fr: `Je n’ai pas bien saisi votre question. Je peux vous renseigner sur :\n• nos produits gaz et leurs prix\n• nos stations Oasis\n• la ZenCard\n• nos coordonnées et horaires\n• nos offres d’emploi\nVous pouvez aussi joindre un conseiller au ${CONTACT.phone}.`,
    en: `I didn’t quite get your question. I can help with:\n• our gas products and prices\n• our Oasis stations\n• the ZenCard\n• our contact details and hours\n• our job offers\nYou can also reach an advisor on ${CONTACT.phone}.`,
    pt: `Não percebi bem a sua pergunta. Posso informá-lo sobre:\n• os nossos produtos de gás e os seus preços\n• os nossos postos Oasis\n• o ZenCard\n• os nossos contactos e horário\n• as nossas ofertas de emprego\nPode também falar com um conselheiro pelo ${CONTACT.phone}.`,
  };
  return { text: text[lang], links: [link(LABELS.advisor[lang], '/contact')] };
}

function resolveLang(rawLang) {
  const lang = baseLang(rawLang);
  return ['fr', 'en', 'pt'].includes(lang) ? lang : 'fr';
}

export function answer(rawText, rawLang) {
  const lang = resolveLang(rawLang);
  const question = normalize(rawText);
  const tokens = words(rawText);

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
  return { links: [], ...reply, text: typeof reply.text === 'string' ? reply.text : reply.text[lang] };
}

const quickQuestions = {
  fr: ['Quels produits gaz proposez-vous ?', 'Comment obtenir ma ZenCard ?', 'Où se trouvent vos stations ?', 'Comment vous contacter ?'],
  en: ['What gas products do you offer?', 'How do I get my ZenCard?', 'Where are your stations?', 'How can I contact you?'],
  pt: ['Que produtos de gás propõem?', 'Como obter o meu ZenCard?', 'Onde ficam os vossos postos?', 'Como vos contactar?'],
};

export function getQuickQuestions(lang) {
  return quickQuestions[resolveLang(lang)];
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
