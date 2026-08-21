export function parsePrice(priceStr) {
  const digits = String(priceStr).replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function formatPrice(amount, lang) {
  const locale = lang === 'en' ? 'en-US' : 'fr-FR';
  // toLocaleString('fr-FR') groups digits with a narrow no-break space
  // (U+202F), which renders almost invisibly in most fonts. Swap it for a
  // regular space to match the spacing already used in the hardcoded
  // product prices across the site.
  const formatted = amount.toLocaleString(locale).replace(/[  ]/g, ' ');
  return `${formatted} FCFA`;
}
