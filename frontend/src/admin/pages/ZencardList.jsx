import { Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './ZencardList.css';

function ZencardList() {
  const { zencardDemandes } = useAdminData();

  return (
    <div className="admin-page-zencardlist">
      <div className="page-header">
        <div>
          <h1>Demandes ZenCard</h1>
          <p>Toutes les demandes de création de carte.</p>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Type</th>
              <th>Station</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {zencardDemandes.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                  Aucune demande ZenCard.
                </td>
              </tr>
            ) : (
              zencardDemandes.map((demande) => (
                <tr key={demande.id}>
                  <td>{demande.nom}</td>
                  <td>{demande.telephone}</td>
                  <td>{demande.type_demande}</td>
                  <td>{demande.station_retrait}</td>
                  <td>
                    {new Date(demande.date_creation).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    {demande.statut === 'en_attente' && <span className="badge-pending">En attente</span>}
                    {demande.statut === 'validee' && <span className="badge-success">Validée</span>}
                    {demande.statut === 'rejetee' && <span className="badge-danger">Rejetée</span>}
                  </td>
                  <td>
                    <Link to={`/admin-panel/zencard/${demande.id}`} className="btn-view">
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

export default ZencardList;
