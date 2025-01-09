import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import '../styles/showtuiles.css';

const ShowTuiles = () => {
  const [tuile, setTuile] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tuiles/${id}`)
      .then((response) => {
        setTuile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div className="showtuiles-container">
      <div className="back-button-container">
        <BackButton />
      </div>
      <h1 className="tuile-title">Détails</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="tuile-details">
          <div className="tuile-field">
            <span className="field-label">Titre</span>
            <span className="field-value">{tuile.titre}</span>
          </div>
          <div className="tuile-field">
            <span className="field-label">Catégorie</span>
            <span className="field-value">{tuile.categorie}</span>
          </div>
          <div className="tuile-field">
            <span className="field-label">Auteur de la tuile</span>
            <span className="field-value">{tuile.auteur}</span>
          </div>
          <div className="tuile-field">
            <span className="field-label">Date de création de la tuile</span>
            <span className="field-value">
              {new Date(tuile.createdAt)
                .toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                .replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </div>
          <div className="tuile-field">
            <span className="field-label">Description</span>
            <div className="description-box">
              <span className="field-value">{tuile.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );


}

export default ShowTuiles