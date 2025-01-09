import React, { useState } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/DeleteTuile.css';

const DeleteTuile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteTuile = () => {
    setLoading(true);
    axios 
      .delete(`http://localhost:5555/tuiles/${id}`)
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
  return (
    <div className="delete-container">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className="delete-form">
        <h3 className="confirmation-text">Êtes-vous sûr de vouloir supprimer cette tuile?</h3>
        <button className="delete-button" onClick={handleDeleteTuile}>
          Oui, supprimer
        </button>
      </div>
    </div>
  );
}

export default DeleteTuile