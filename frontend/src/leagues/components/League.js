import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // const [selectedLeague, setSelectedLeague] = useState();
  const { leagues } = props;
  const { country, league } = useParams();
  const capitalizedCountry = capitalizeWords(country);
  const navigate = useNavigate();

  const handleFixturesClick = () => {
    setActiveTable('table');
    //navigate(`./fixtures`);
  };

  const handleTableClick = () => {
    setActiveTable('leagueTable');
    //navigate(`./table`);
  };

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch('http://localhost:5000/:country/:league');

  //       const responseData = await response.json();
  //       console.log(responseData);
  //       setSelectedLeague(responseData);

  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendRequest();
  // }, []);

  const selectedLeague = leagues.find(l => l.name === country && l.title === league);

  useEffect(() => {
    if (!selectedLeague) {
      navigate(`/`);
    }
  }, [selectedLeague, navigate]);

  if (!selectedLeague) {
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
            image={selectedLeague.image}
          />
        ) : (
          <LeagueTable league={selectedLeague} teams={clubs} image={selectedLeague.image} />
        )}
        <Link to='/' className='link'>
          <div className='button-container'>
            <button>Homepage</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default League;
