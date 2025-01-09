import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditTuile.css';

const EditTuile = () => {
  const [titre, setTitre] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/tuiles/${id}`)
      .then((response) => {
        setTitre(response.data.titre)
        setDescription(response.data.description)
        setCategorie(response.data.categorie)
        setDate(response.data.date)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('Erreur check console');
        console.log(error);
      });
  }, [])
  const handleEditTuile = () => {
    const data = {
      titre,
      description,
      date,
      categorie,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/tuiles/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Erreur check console');
        console.log(error);
      });
  };

  const categories = ['category1', 'category2', 'category3'];

  return (
    <div className="edit-tuile-container">
      <div className="edit-tuile-back-button">
        <BackButton />
      </div>
      <h1 className="edit-tuile-title">Modifier tuile</h1>
      {loading ? <Spinner /> : ''}
      <div className="edit-tuile-form">
        <div className="edit-tuile-form-group">
          <label className="edit-tuile-form-label">Titre</label>
          <input 
            type="text" 
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="edit-tuile-form-input"   
          />
        </div>
        <div className="edit-tuile-form-group">
          <label className="edit-tuile-form-label">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-tuile-form-input"   
          />
        </div>
        <div className="edit-tuile-form-group">
          <label className="edit-tuile-form-label">Catégorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="edit-tuile-form-input"
          >
            <option value=''>Choisir une catégorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button className="edit-tuile-save-button" onClick={handleEditTuile}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditTuile