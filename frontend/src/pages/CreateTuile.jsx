import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import '../styles/CreateTuile.css';

const CreateTuile = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [auteur, setAuteur] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext()
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.username) {
      setAuteur(user.username);
    }
  }, [user]);
  
  const handleSaveTuile = () => {
    const data = {
      titre,
      description,
      categorie,
      auteur,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/tuiles', data)
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
  const categories = ['Sport', 'FPS', 'Souls', 'Sandbox', 'Open World', 'MOBA', 'MMORPG'];
  return (
    <div className="create-tuile-container">
      <div className="create-tuile-back-button">
        <BackButton />
      </div>
      <h1 className="create-tuile-title">Créer une tuile</h1>
      {loading ? <Spinner /> : ''}
      <div className="create-tuile-form">
        <div className="create-tuile-form-group">
          <label className="create-tuile-form-label">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="create-tuile-form-input"
          />
        </div>
        <div className="create-tuile-form-group">
          <label className="create-tuile-form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="create-tuile-form-input"
          />
        </div>
        <div className="create-tuile-form-group">
          <label className="create-tuile-form-label">Catégorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="create-tuile-form-input"
          >
            <option value=''>Choisir une catégorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button className="create-tuile-save-button" onClick={handleSaveTuile} >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateTuile