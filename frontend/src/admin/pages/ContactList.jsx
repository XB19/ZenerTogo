import { Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './ContactList.css';

function ContactList() {
  const { contactMessages } = useAdminData();

  return (
    <div className="admin-page-contactlist">
      <div className="page-header">
        <div>
          <h1>Messages Contact</h1>
          <p>Tous les messages envoyés depuis le site.</p>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contactMessages.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                  Aucun message reçu.
                </td>
              </tr>
            ) : (
              contactMessages.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.nom}</td>
                  <td>{contact.email}</td>
                  <td>{contact.sujet}</td>
                  <td>
                    {new Date(contact.created_at).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    {contact.lu ? (
                      <span className="badge-read">Lu</span>
                    ) : (
                      <span className="badge-new">Nouveau</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin-panel/contact/${contact.id}`} className="btn-view">
                      Voir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactList;
