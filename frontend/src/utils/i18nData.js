export function pickLang(field, lang) {
  if (field && typeof field === 'object') {
    return field[lang] ?? field.fr ?? '';
  }
  return field;
}
