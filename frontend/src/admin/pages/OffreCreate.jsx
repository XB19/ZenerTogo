import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './OffreCreate.css';

const initialForm = {
  titre: '',
  ville: '',
  type_contrat: '',
  departement: '',
  description: '',
  missions: '',
  profil: '',
  date_limite: '',
};

function OffreCreate() {
  const { addOffre } = useAdminData();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOffre({ ...form, actif: true });
    navigate('/admin-panel/carrieres/offres');
  };

  return (
    <div className="admin-page-offrecreate">
      <div className="form-card">
        <div className="form-header">
          <h1>Nouvelle offre d'emploi</h1>
          <p>Publiez une nouvelle opportunité de recrutement pour ZENER.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Titre du poste</label>
              <input
                type="text"
                name="titre"
                required
                placeholder="Responsable Commercial"
                value={form.titre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ville</label>
              <input
                type="text"
                name="ville"
                required
                placeholder="Lomé"
                value={form.ville}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Type de contrat</label>
              <select name="type_contrat" required value={form.type_contrat} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Temps plein">Temps plein</option>
                <option value="Temps partiel">Temps partiel</option>
              </select>
            </div>

            <div className="form-group">
              <label>Département</label>
              <input
                type="text"
                name="departement"
                placeholder="Direction Commerciale"
                value={form.departement}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>Description du poste</label>
              <textarea
                name="description"
                required
                placeholder="Présentation générale du poste..."
                value={form.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group full">
              <label>Missions</label>
              <textarea
                name="missions"
                required
                placeholder="Liste des missions principales..."
                value={form.missions}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group full">
              <label>Profil recherché</label>
              <textarea
                name="profil"
                required
                placeholder="Compétences, expériences et qualités recherchées..."
                value={form.profil}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Date limite</label>
              <input type="date" name="date_limite" value={form.date_limite} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Publier l'offre
            </button>

            <Link to="/admin-panel/carrieres/offres" className="btn-secondary">
              Retour
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OffreCreate;
