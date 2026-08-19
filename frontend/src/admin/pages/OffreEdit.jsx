import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './OffreEdit.css';

function OffreEdit() {
  const { id } = useParams();
  const { offres, updateOffre } = useAdminData();
  const navigate = useNavigate();

  const offre = offres.find((o) => String(o.id) === id);
  const [form, setForm] = useState(() =>
    offre
      ? {
          titre: offre.titre,
          ville: offre.ville,
          type_contrat: offre.type_contrat,
          departement: offre.departement,
          description: offre.description,
          missions: offre.missions,
          profil: offre.profil,
          date_limite: offre.date_limite || '',
          actif: offre.actif,
        }
      : null
  );

  if (!offre || !form) {
    return (
      <div className="admin-page-offreedit">
        <div className="form-card">
          <h1>Offre introuvable</h1>
          <p>
            <Link to="/admin-panel/carrieres/offres">Retour à la liste</Link>
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOffre(offre.id, { ...form, actif: form.actif === 'True' || form.actif === true });
    navigate('/admin-panel/carrieres/offres');
  };

  return (
    <div className="admin-page-offreedit">
      <div className="form-card">
        <div className="form-header">
          <h1>Modifier l'offre</h1>
          <p>Mettre à jour les informations de cette offre d'emploi.</p>
        </div>

        {offre.actif ? (
          <div className="offer-status status-active">Offre active</div>
        ) : (
          <div className="offer-status status-closed">Offre fermée</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Titre du poste</label>
              <input type="text" name="titre" value={form.titre} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Ville</label>
              <input type="text" name="ville" value={form.ville} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Type de contrat</label>
              <select name="type_contrat" value={form.type_contrat} onChange={handleChange} required>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Temps plein">Temps plein</option>
                <option value="Temps partiel">Temps partiel</option>
              </select>
            </div>

            <div className="form-group">
              <label>Département</label>
              <input type="text" name="departement" value={form.departement} onChange={handleChange} />
            </div>

            <div className="form-group full">
              <label>Description du poste</label>
              <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group full">
              <label>Missions</label>
              <textarea name="missions" value={form.missions} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group full">
              <label>Profil recherché</label>
              <textarea name="profil" value={form.profil} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label>Date limite</label>
              <input type="date" name="date_limite" value={form.date_limite || ''} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Statut</label>
              <select name="actif" value={String(form.actif)} onChange={handleChange}>
                <option value="True">Active</option>
                <option value="False">Fermée</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Enregistrer les modifications
            </button>

            <Link to="/admin-panel/carrieres/offres" className="btn-cancel">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OffreEdit;
