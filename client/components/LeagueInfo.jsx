import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../styles/ResultTable.css';

const LeagueInfo = ({ leagueName, leagueEmblem, areaName, allStarsActive, handleMainStarClick }) => {
  return (
    <div className='league-info'>
      <button onClick={handleMainStarClick} className='star-btn'>
        {allStarsActive ? <FaStar /> : <CiStar />}
      </button>
      <img src={leagueEmblem} alt={`${leagueName} Badge`} className='league_badge' />
      <div className='club-text'>
        <span className='text1'>{leagueName}</span>
        <span className='text2'>{areaName}</span>
      </div>
    </div>
  );
};

export default LeagueInfo;
