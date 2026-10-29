// Les navigateurs peuvent remonter « pt-PT » ou « en-GB » : on ne garde que
// le code de langue.
export function baseLang(lang) {
  return (lang || 'fr').slice(0, 2);
}

export function pickLang(field, lang) {
  if (field && typeof field === 'object') {
    return field[baseLang(lang)] ?? field.fr ?? '';
  }
  return field;
}

const DATE_LOCALES = { fr: 'fr-FR', en: 'en-GB', pt: 'pt-PT' };

export function dateLocale(lang) {
  return DATE_LOCALES[baseLang(lang)] ?? 'fr-FR';
}
