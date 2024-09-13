import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../styles/ResultTable.css';
import MatchModal from './MatchModal';
import TableBody from './ResultTableBody';
import { fetchCurrentMatches } from '../util/http';
import { useFetch } from '../hooks/useFetch';

const ResultTable = () => {
  const [allStarsActive, setAllStarsActive] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleMainStarClick = () => {
    setAllStarsActive(!allStarsActive);
    if (allStarsActive) {
      setFavourites([]);
    } else {
      const allIndices = Array.from({ length: 10 }, (_, i) => i);
      setFavourites(allIndices);
    }
  };

  const handleFavorite = index => {
    if (favourites.includes(index)) {
      setFavourites(favourites.filter(favIndex => favIndex !== index));
    } else {
      setFavourites([...favourites, index]);
    }
  };

  const handleRowClick = matchData => {
    setSelectedMatch(matchData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading: isLoadingMatches, error: matchesError, fetchedData: matches } = useFetch(fetchCurrentMatches, []);
  
  return (
    <div className='table-container'>
      <MatchModal isOpen={isModalOpen} matchData={selectedMatch} onClose={closeModal} />
      <div className='league-info'>
        <button onClick={handleMainStarClick} className='star-btn'>
          {allStarsActive ? <FaStar /> : <CiStar />}
        </button>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png'
          alt='League 1 Badge'
          className='league_badge'
        />
        <div className='club-text'>
          <span className='text1'>La Liga</span>
          <span className='text2'>Spain</span>
        </div>
      </div>
      <table className='styled-table'>
        <thead className='table-head'>
          <tr>{/* Add table headers here if needed */}</tr>
        </thead>
        <TableBody favourites={favourites} handleFavorite={handleFavorite} handleRowClick={handleRowClick} />
      </table>
    </div>
  );
};

export default ResultTable;
