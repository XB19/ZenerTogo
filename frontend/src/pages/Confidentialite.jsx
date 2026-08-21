import { useTranslation } from 'react-i18next';
import './Confidentialite.css';

function Confidentialite() {
  const { t } = useTranslation();

  return (
    <div className="page-confidentialite">
      <div className="container">
        <h1>{t('confidentialite.title')}</h1>

        <p className="draft-notice">{t('confidentialite.draftNotice')}</p>

        <p>{t('confidentialite.paragraph1')}</p>

        <p>{t('confidentialite.paragraph2')}</p>
      </div>
    </div>
  );
}

export default Confidentialite;
