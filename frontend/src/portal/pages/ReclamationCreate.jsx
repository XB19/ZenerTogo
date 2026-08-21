import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientData } from '../ClientDataContext.jsx';
import { reclamationCategories } from '../../data/clientPortalMockData.js';
import './ClientPortalPages.css';

const initialForm = { sujet: '', categorie: '', description: '' };

function ReclamationCreate() {
  const { addReclamation } = useClientData();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reclamation = addReclamation(form);
    navigate(`/portail-client/reclamations/${reclamation.id}`);
  };

  return (
    <div>
      <h1 className="cp-page-title">Créer une réclamation</h1>
      <p className="cp-page-subtitle">
        Décrivez votre problème, notre service client vous répondra dans les meilleurs délais.
      </p>

      <div className="cp-card">
        <form onSubmit={handleSubmit}>
          <div className="cp-form-grid">
            <div className="cp-form-group">
              <label>Sujet *</label>
              <input type="text" name="sujet" value={form.sujet} onChange={handleChange} required />
            </div>

            <div className="cp-form-group">
              <label>Catégorie *</label>
              <select name="categorie" value={form.categorie} onChange={handleChange} required>
                <option value="">Sélectionner</option>
                {reclamationCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cp-form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez votre problème le plus précisément possible..."
              required
            ></textarea>
          </div>

          <button type="submit" className="cp-btn-primary">
            Envoyer ma réclamation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReclamationCreate;
