import React, { useState, useEffect } from 'react';
import Table from './Table.js';
import LoadingSpinner from '../../shared/UI/LoadingSpinner.js';
import './LeaguesTables.css';

const LeaguesTables = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const leagues = props.items;
  const clubs = props.clubs; 

  const errorHandler = () => {
    setError(null);
  };

  if (!props.items) {
    return <p>No tables available.</p>;
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay/>
        </div>
      )}
      {!isLoading && clubs && (
        <ul className='league-tables'>
          {leagues.map(league => {
            const leagueClubs = clubs.filter(club => club.league === league.id);
            return (
              <Table
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.title}
                clubs={leagueClubs} 
                image={league.image}
              />
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default LeaguesTables;
