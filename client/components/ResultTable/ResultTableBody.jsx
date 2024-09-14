import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../../styles/ResultTable.css';
import { formatScore, formatTime } from '../../util/helpers';

const TableBody = ({ favourites, handleFavorite, handleRowClick, matches }) => {
  const rows = matches.map((match, index) => {
    const { utcDate, homeTeam, awayTeam, score } = match;

    return (
      <tr key={index} onClick={() => handleRowClick(match)} className='clickable-row'>
        <td>
          <button
            onClick={e => {
              e.stopPropagation(); 
              handleFavorite(index);
            }}
            className='star-btn'
          >
            {favourites.includes(index) ? <FaStar /> : <CiStar />}
          </button>
        </td>
        <td>{formatTime(utcDate)}</td>
        <td>
          <img src={homeTeam.crest} alt={`${homeTeam.name} Badge`} className='badge' />
        </td>
        <td>{homeTeam.name}</td>
        <td className='result'>{formatScore(score)}</td>
        <td>{awayTeam.name}</td>
        <td>
          <img src={awayTeam.crest} alt={`${awayTeam.name} Badge`} className='badge' />
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableBody;
