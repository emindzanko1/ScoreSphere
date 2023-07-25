import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Table from './Table';
import LeagueTable from './LeagueTable';
import { clubs } from '../../clubs/pages/Clubs';

import './League.css';

const capitalizeWords = str => {
  const smallWords = ['and', 'is', 'of'];
  return str
    .split('-')
    .map((word, index) =>
      smallWords.includes(word.toLowerCase()) && index !== 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
};

const League = props => {

  const [activeTable, setActiveTable] = useState('table');
  const { leagues } = props;
  const { country, league } = useParams();
  const capitalizedCountry = capitalizeWords(country);
  const navigate = useNavigate();

  const handleFixturesClick = () => {
      setActiveTable('table');
      //navigate(`./proba`);    
  };

  const handleTableClick = () => {
      setActiveTable('leagueTable');
      //navigate(`./table`); sa useEffect probati
    
  };
 
  const selectedLeague = leagues.find(l => l.name === country && l.title === league);

  if (!selectedLeague) {
    navigate(`/`);
    return null;
  }

  const leagueClubs = clubs.filter(club => club.leagueId === selectedLeague.id);

  return (
    <div className='league-title'>
      <h2>Welcome to {capitalizedCountry}!</h2>
      <div className='league-container'>
        <div className='button-container'>
          <button onClick={handleFixturesClick} className={activeTable === 'table' ? 'active' : ''}>
            Fixtures
          </button>
          <button onClick={handleTableClick} className={activeTable === 'leagueTable' ? 'active' : ''}>
            Table
          </button>
        </div>
        {activeTable === 'table' ? (
          <Table
            key={selectedLeague.id}
            id={selectedLeague.id}
            name={selectedLeague.name}
            title={selectedLeague.title}
            clubs={leagueClubs}
          />
        ) : (
          <LeagueTable leagues={leagues} teams={clubs} />
        )}
        <Link to='/'>Go back to homepage</Link>
      </div>
    </div>
  );
};

export default League;
