import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ShareButtons.css';

function ShareButtons({ url, title }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-buttons">
      <span className="share-label">{t('shareButtons.label')}</span>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('shareButtons.shareOn', { network: link.label })}
        >
          <i className={link.icon}></i>
        </a>
      ))}

      <button type="button" onClick={handleCopy} aria-label={t('shareButtons.copyLink')}>
        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`}></i>
        {copied && <span className="share-copied">{t('shareButtons.copied')}</span>}
      </button>
    </div>
  );
}

export default ShareButtons;
