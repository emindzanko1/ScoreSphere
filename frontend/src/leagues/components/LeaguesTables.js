import React, { useState, useEffect } from 'react';
import Table from './Table.js';
import LoadingSpinner from '../../shared/UI/LoadingSpinner.js';
import './LeaguesTables.css';

const LeaguesTables = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [clubs, setClubs] = useState();

  const leagues = props.items;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        //  const response = await fetch(`http://localhost:5000/team/clubs/64da69207990cf48660802e6`);
        const response = await fetch(`http://localhost:5000/team/clubs/${leagues[0].title}`);
        const responseData = await response.json();
        setClubs(responseData.clubs);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

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
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && clubs && (
        <ul className='league-tables'>
          {leagues.map(league => {
            return (
              <Table
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.title}
                clubs={clubs}
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
