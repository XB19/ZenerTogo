import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './ContactDetail.css';

function ContactDetail() {
  const { id } = useParams();
  const { contactMessages, markContactRead } = useAdminData();
  const contact = contactMessages.find((c) => String(c.id) === id);

  useEffect(() => {
    if (contact && !contact.lu) {
      markContactRead(contact.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact?.id]);

  if (!contact) {
    return (
      <div className="admin-page-contactdetail">
        <h1>Message introuvable</h1>
        <p>
          <Link to="/admin-panel/contact">Retour aux messages</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page-contactdetail">
      <div className="detail-card">
        <h1>{contact.sujet}</h1>

        <div className="info-grid">
          <div className="info-box">
            <div className="label">Nom</div>
            <div className="value">{contact.nom}</div>
          </div>

          <div className="info-box">
            <div className="label">Email</div>
            <div className="value">{contact.email}</div>
          </div>

          <div className="info-box">
            <div className="label">Téléphone</div>
            <div className="value">{contact.telephone}</div>
          </div>

          <div className="info-box">
            <div className="label">Date</div>
            <div className="value">
              {new Date(contact.created_at).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>

        <h3>Message</h3>

        <div className="message-box">
          {contact.message.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <Link to="/admin-panel/contact" className="back-btn">
          ← Retour aux messages
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
