import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

const STATUT_LABEL = { synchronise: 'Synchronisé', en_attente: 'En attente', erreur: 'Erreur' };
const STATUT_BADGE = { synchronise: 'badge-green', en_attente: 'badge-orange', erreur: 'badge-red' };

function SAP() {
  const { sapRecords } = useBackOfficeData();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Intégration SAP</h1>
          <p>État de synchronisation des données clients, contrats et factures avec SAP.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Référence SAP</th>
                <th>Type</th>
                <th>Libellé</th>
                <th>Dernière synchro</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {sapRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.reference}</strong>
                  </td>
                  <td>{r.type}</td>
                  <td>{r.libelle}</td>
                  <td>
                    {new Date(r.derniereSync).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    <span className={`badge ${STATUT_BADGE[r.statutSync]}`}>{STATUT_LABEL[r.statutSync]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SAP;
