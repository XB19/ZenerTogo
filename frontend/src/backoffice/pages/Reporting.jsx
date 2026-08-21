import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

function Reporting() {
  const { reports } = useBackOfficeData();

  const handleDownload = (report) => {
    // TODO: brancher le vrai téléchargement de rapport une fois l'API prête.
    window.alert(`Téléchargement de "${report.nom}" (${report.format}) — à brancher sur l'API.`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Reporting</h1>
          <p>Rapports générés automatiquement pour le pilotage de l'activité.</p>
        </div>

        <button type="button" className="btn-primary" onClick={() => window.alert('Génération de rapport à brancher sur l\'API.')}>
          <i className="fa-solid fa-plus"></i>
          Générer un rapport
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rapport</th>
                <th>Type</th>
                <th>Période</th>
                <th>Généré le</th>
                <th>Format</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.nom}</strong>
                  </td>
                  <td>
                    <span className="badge badge-blue">{r.type}</span>
                  </td>
                  <td>{r.periode}</td>
                  <td>
                    {new Date(r.dateGeneration).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>{r.format}</td>
                  <td>
                    <button type="button" className="btn-outline" onClick={() => handleDownload(r)}>
                      <i className="fa-solid fa-download"></i> Télécharger
                    </button>
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

export default Reporting;
