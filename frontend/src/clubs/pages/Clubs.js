import React, { useEffect, useState } from 'react';
import ClubsList from '../components/ClubsList';
import LoadingSpinner from '../../shared/UI/LoadingSpinner';

const Clubs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [leagues, setLeagues] = useState();
  const [clubs, selecetedClubs] = useState();

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

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/team/clubs`);

        const responseData = await response.json();
        selecetedClubs(responseData.clubs);

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
      {!isLoading && clubs && leagues && (
        <div>
          <ClubsList clubs={clubs} leagues={leagues} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Clubs;
