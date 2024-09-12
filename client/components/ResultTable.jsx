import React, { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../styles/ResultTable.css';
import MatchModal from './MatchModal';

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

  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const matchData = {
        time: `${Math.floor(Math.random() * 90) + 1}'`,
        team1: 'Manchester City',
        team2: 'Barcelona',
        score: `${Math.floor(Math.random() * 5)} - ${Math.floor(Math.random() * 5)}`,
        team1Badge: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
        team2Badge: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      };
      rows.push(
        <tr key={i} onClick={() => handleRowClick(matchData)} className="clickable-row">
          <td>
            <button onClick={e => {
              e.stopPropagation(); // Prevent row click when star is clicked
              handleFavorite(i);
            }} className='star-btn'>
              {favourites.includes(i) ? <FaStar /> : <CiStar />}
            </button>
          </td>
          <td>{matchData.time}</td>
          <td>
            <img
              src={matchData.team1Badge}
              alt='Club 1 Badge'
              className='badge'
            />
          </td>
          <td>{matchData.team1}</td>
          <td className='result'>{matchData.score}</td>
          <td>{matchData.team2}</td>
          <td>
            <img
              src={matchData.team2Badge}
              alt='Club 2 Badge'
              className='badge'
            />
          </td>
        </tr>
      );
    }
    return rows;
  };

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
          <tr>{/* <th><button className="star-btn"><CiStar /></button></th> */}</tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <thead className='table-head'>
          <tr>
            <div className='club-info'>
              <img
                src='https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'
                alt='Club 1 Badge'
                className='league_badge'
              />
              <div className='club-text'>
                <span className='text1'>Text 1</span>
                <span className='text2'>Text 2</span>
              </div>
            </div>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <tbody>{generateRows()}</tbody>
      </table>
    </div>
  );
};

export default ResultTable;
