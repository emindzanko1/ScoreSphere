import React, { useState, useEffect } from 'react';
import Table from './Table.js';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.js';
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
      {!isLoading && leagues && clubs && (
        <ul className='league-tables'>
        {/* {leagues.map(league => (
            <Table
              key={league.id}
              id={league.id}
              name={league.name}
              title={league.area.name}
              clubs={clubs}
              image={league.area.flag}
            />
          ))} */}
          {leagues.map(league => {
            const leagueClubs = clubs.filter(club => club.area.id === league.area.id);
            return (
              <Table
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.area.name}
                code = {league.code}
                clubs={leagueClubs} 
                image={league.area.flag}
              />
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default LeaguesTables;

