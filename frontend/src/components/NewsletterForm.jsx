import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { subscribe } from '../services/newsletterService.js';
import './NewsletterForm.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const emailId = useId();
  const errorId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    if (!EMAIL_RE.test(email)) {
      setError(t('newsletter.invalidEmail'));
      setStatus('error');
      return;
    }

    if (!consent) {
      setError(t('newsletter.consentRequired'));
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      await subscribe(email);
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch {
      setError(t('newsletter.submitError'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter-form">
        <h4>{t('newsletter.title')}</h4>
        <p className="newsletter-success">{t('newsletter.success')}</p>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <h4>{t('newsletter.title')}</h4>
      <p>{t('newsletter.description')}</p>

      <div className="newsletter-row">
        <label htmlFor={emailId} className="sr-only">
          {t('newsletter.placeholder')}
        </label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholder')}
          aria-describedby={status === 'error' ? errorId : undefined}
          aria-invalid={status === 'error'}
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t('newsletter.submitting') : t('newsletter.submit')}
        </button>
      </div>

      {status === 'error' && (
        <p id={errorId} className="newsletter-error">
          {error}
        </p>
      )}

      <label className="newsletter-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          {t('newsletter.consentPrefix')}{' '}
          <Link to="/confidentialite">{t('newsletter.privacyPolicy')}</Link>.
        </span>
      </label>
    </form>
  );
}

export default NewsletterForm;
