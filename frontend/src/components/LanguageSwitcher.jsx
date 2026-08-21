import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || 'fr';

  return (
    <div className="language-switcher" role="group" aria-label="Choix de la langue / Language">
      {LANGUAGES.map((lang) => (
        <button
          type="button"
          key={lang.code}
          className={current === lang.code ? 'active' : ''}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={current === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
