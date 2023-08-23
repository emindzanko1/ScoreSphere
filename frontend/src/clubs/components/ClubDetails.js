import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../leagues/components/Table';
import LeagueTable from '../../leagues/components/LeagueTable';

import './ClubDetails.css';

const ClubDetails = props => {
  const [activeTable, setActiveTable] = useState('table');
  const [selectedClub, setSelectedClub] = useState(null);

  const club = props.club;
  const league = props.league;

  let name;

  if (club && league) {
    name = league.name.charAt(0).toUpperCase() + props.league.name.slice(1);
  }

  const handleFixturesClick = () => {
    setActiveTable('table');
    setSelectedClub(null);
    //navigate(`./proba`);
  };

  const handleTableClick = () => {
    setActiveTable('leagueTable');
    setSelectedClub(club);
    //navigate(`./table`); sa useEffect probati
  };

  return (
    <div className='container'>
      {club  ? (
        <>
          <h1>{name}</h1>
          <div className='club-image-container'>
            <img src={club.crest} alt={club.name} className='club-image' />
          </div>
          <h2 className='club-name'>{club.name}</h2>
          <div className='button-container'>
            <button onClick={handleFixturesClick} className={activeTable === 'table' ? 'active' : ''}>
              Fixture
            </button>
            <button onClick={handleTableClick} className={activeTable === 'leagueTable' ? 'active' : ''}>
              Table
            </button>
          </div>
          {activeTable === 'table' ? (
            <Table
              key={league.id}
              id={league.id}
              name={league.name}
              title={league.area.name}
              clubs={props.myClubs}
              image={league.area.flag}
            />
          ) : (
            <LeagueTable league={league} teams={props.clubs} selectedClub={selectedClub} image={league.area.flag} />
          )}
          <Link to='/' className='link'>
            <div className='button-container'>
              <button>Homepage</button>
            </div>
          </Link>
        </>
      ) : (
        <h2>Sacekaj malo</h2>
      )}
    </div>
  );
};

export default ClubDetails;
