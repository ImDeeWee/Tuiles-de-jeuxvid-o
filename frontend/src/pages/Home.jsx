import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import TuilesCard from '../components/home/TuilesCard';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import Spinner from '../components/Spinner.jsx';
import { io } from 'socket.io-client';
import '../styles/home.css';

const socket = io('http://localhost:5555');

const Home = () => {
  const [tuiles, setTuiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [auteurFilter, setAuteurFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyTuiles, setShowMyTuiles] = useState(false);
  const [auteurs, setAuteurs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuthContext();
  const limit = 15;

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleAuteurChange = (e) => {
    setAuteurFilter(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowMyTuiles = () => {
    setShowMyTuiles(!showMyTuiles);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString().split('T')[0];
  };

  const fetchTuiles = () => {
    setLoading(true);
    axios
      .get('http://localhost:5555/tuiles')
      .then((response) => {
        const tuilesData = response.data.data;
        setTuiles(tuilesData);
        setTotalPages(Math.ceil(tuilesData.length / limit));

        const uniqueAuteurs = [...new Set(tuilesData.map(tuile => tuile.auteur))];
        setAuteurs(uniqueAuteurs);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTuiles();

    socket.on('tuileChanged', (data) => {
      fetchTuiles();
    });

    return () => {
      socket.off('tuileChanged');
    };
  }, []);

  const filteredTuiles = tuiles.filter((tuile) => {
    const tuileDate = normalizeDate(tuile.createdAt);
    const filterDate = dateFilter ? normalizeDate(dateFilter) : null;

    return (
      (categoryFilter ? tuile.categorie === categoryFilter : true) &&
      (filterDate ? tuileDate === filterDate : true) &&
      (showMyTuiles ? tuile.auteur === user.username : true) &&
      (auteurFilter ? tuile.auteur === auteurFilter : true) &&
      (searchQuery ? tuile.titre.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  const paginatedTuiles = filteredTuiles.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className='home-container'>
      <div className='header'>
    <div className='create-container'>
        <div className='create-label-box'>
            <label className='create-label'>Créer une tuile</label>
            <Link to='/tuiles/create'>
                <MdOutlineAddBox className='create-icon' />
            </Link>
        </div>
    </div>
</div>

      <div className='filters'>
        <select onChange={handleCategoryChange} value={categoryFilter} className='category-select'>
          <option value=''>Toutes les catégories</option>
          <option value='Sport'>Sport</option>
          <option value='FPS'>FPS</option>
          <option value='MOBA'>MOBA</option>
          <option value='MMORPG'>MMORPG</option>
          <option value='Souls'>Souls</option>
          <option value='Sandbox'>Sandbox</option>
          <option value='Open World'>Open World</option>
        </select>
        <div className='auteur-filter'>
          <select onChange={handleAuteurChange} value={auteurFilter} className='auteur-select'>
            <option value=''>Tous les auteurs</option>
            {auteurs.map((auteur, index) => (
              <option key={index} value={auteur}>
                {auteur}
              </option>
            ))}
          </select>
        </div>
        <div className='date-filter'>
          <label className='date-label'>Date de création</label>
          <input type='date' onChange={handleDateChange} value={dateFilter} className='date-input' />
        </div>
        <button className='my-tuiles-button' onClick={handleShowMyTuiles}>
          {showMyTuiles ? 'Voir toutes les tuiles' : 'Voir mes tuiles'}
        </button>
      </div>
      <div className='search-bar'>
        <label className='search-label'>Rechercher par titre</label>
        <input type='text' onChange={handleSearchQueryChange} value={searchQuery} className='search-input' placeholder='Rechercher...' />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TuilesCard tuiles={paginatedTuiles} />
          <div className='pagination'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
