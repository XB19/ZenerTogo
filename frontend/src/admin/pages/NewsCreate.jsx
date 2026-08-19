import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './NewsCreate.css';

const initialForm = { titre: '', categorie: '', contenu: '', actif: 'True' };

function NewsCreate() {
  const { addActualite } = useAdminData();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addActualite({
      titre: form.titre,
      categorie: form.categorie,
      contenu: form.contenu,
      actif: form.actif === 'True',
      image: imagePreview,
    });
    navigate('/admin-panel/news');
  };

  return (
    <div className="admin-page-newscreate">
      <div className="form-card">
        <h1>Créer une actualité</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input type="text" name="titre" required value={form.titre} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <input type="text" name="categorie" required value={form.categorie} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input type="file" name="image" required onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label>Contenu</label>
            <textarea name="contenu" rows={6} required value={form.contenu} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Statut</label>
            <select name="actif" value={form.actif} onChange={handleChange}>
              <option value="True">Actif</option>
              <option value="False">Inactif</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">
            Publier
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsCreate;
