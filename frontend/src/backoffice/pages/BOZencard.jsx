import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

const STATUT_LABEL = { active: 'Active', en_attente: 'En attente', suspendue: 'Suspendue' };
const STATUT_BADGE = { active: 'badge-green', en_attente: 'badge-orange', suspendue: 'badge-red' };

function BOZencard() {
  const { zencardDossiers } = useBackOfficeData();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>ZenCard</h1>
          <p>Vue Customer Care de l'ensemble des dossiers ZenCard clients.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th>Type</th>
                <th>Solde</th>
                <th>Dernière activité</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {zencardDossiers.map((d) => (
                <tr key={d.id}>
                  <td>
                    <strong>{d.numero}</strong>
                  </td>
                  <td>{d.client}</td>
                  <td>{d.type}</td>
                  <td>{d.solde.toLocaleString('fr-FR')} FCFA</td>
                  <td>{new Date(d.derniereActivite).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`badge ${STATUT_BADGE[d.statut]}`}>{STATUT_LABEL[d.statut]}</span>
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

export default BOZencard;
