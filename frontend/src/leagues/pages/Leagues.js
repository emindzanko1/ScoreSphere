import React, { useState, useEffect } from 'react';
import LeaguesList from '../components/LeaguesList';
import axios from 'axios';
import LeaguesTables from '../components/LeaguesTables';
import LoadingSpinner from '../../shared/UI/LoadingSpinner';

const Leagues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [leagues, setLeagues] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/leagues');

        const responseData = await response.json();
        setLeagues(responseData.leagues);

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

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && leagues && (
        <div className='leagues-container'>
          <LeaguesList items={leagues} />
          <LeaguesTables items={leagues} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Leagues;
