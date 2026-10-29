import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getQuickQuestions, sendMessage } from '../services/chatService.js';
import './ChatWidget.css';

function ChatWidget({ open, onOpenChange }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([{ id: 'welcome', from: 'bot', text: t('chat.welcome') }]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    setMessages((current) =>
      current.map((m) => (m.id === 'welcome' ? { ...m, text: t('chat.welcome') } : m))
    );
  }, [i18n.language, t]);

  const pushMessage = (message) => {
    setMessages((current) => [...current, message]);
  };

  const submitText = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    pushMessage({ id: `user-${Date.now()}`, from: 'user', text: trimmed });
    setDraft('');
    setSending(true);

    try {
      const reply = await sendMessage(trimmed, i18n.language);
      pushMessage({ id: `bot-${Date.now()}`, from: 'bot', text: reply.text, links: reply.links });
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitText(draft);
  };

  const quickQuestions = getQuickQuestions(i18n.language);

  return (
    <>
      <button
        type="button"
        className="chat-toggle"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? t('chat.toggleClose') : t('chat.toggleOpen')}
        aria-expanded={open}
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
      </button>

      {open && (
        <div className="chat-window" role="dialog" aria-label={t('chat.windowLabel')}>
          <div className="chat-header">
            <span>{t('chat.header')}</span>
            <button type="button" onClick={() => onOpenChange(false)} aria-label={t('chat.toggleClose')}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m) => (
              <div className={`chat-message chat-message-${m.from}`} key={m.id}>
                <div className={`chat-bubble chat-bubble-${m.from}`}>{m.text}</div>
                {m.links?.length > 0 && (
                  <div className="chat-links">
                    {m.links.map((l) => (
                      <Link key={l.to} to={l.to} onClick={() => onOpenChange(false)}>
                        {l.label} <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="chat-bubble chat-bubble-bot chat-typing" aria-label={t('chat.typing')}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {messages.length === 1 && !sending && (
              <div className="chat-suggestions">
                {quickQuestions.map((q) => (
                  <button type="button" key={q} onClick={() => submitText(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.inputLabel')}
            />
            <button type="submit" aria-label={t('chat.send')} disabled={sending || !draft.trim()}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
