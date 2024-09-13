import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../styles/ResultTable.css';

const TableBody = ({ favourites, handleFavorite, handleRowClick }) => {
  const rows = Array.from({ length: 10 }, (_, i) => {
    const matchData = {
      time: `${Math.floor(Math.random() * 90) + 1}'`,
      team1: 'Manchester City',
      team2: 'Barcelona',
      score: `${Math.floor(Math.random() * 5)} - ${Math.floor(Math.random() * 5)}`,
      team1Badge: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
      team2Badge: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    };

    return (
      <tr key={i} onClick={() => handleRowClick(matchData)} className='clickable-row'>
        <td>
          <button
            onClick={e => {
              e.stopPropagation(); 
              handleFavorite(i);
            }}
            className='star-btn'
          >
            {favourites.includes(i) ? <FaStar /> : <CiStar />}
          </button>
        </td>
        <td>{matchData.time}</td>
        <td>
          <img src={matchData.team1Badge} alt='Club 1 Badge' className='badge' />
        </td>
        <td>{matchData.team1}</td>
        <td className='result'>{matchData.score}</td>
        <td>{matchData.team2}</td>
        <td>
          <img src={matchData.team2Badge} alt='Club 2 Badge' className='badge' />
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableBody;
