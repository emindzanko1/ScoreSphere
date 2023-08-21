import React, { useState, useEffect } from 'react';
import LeaguesList from '../components/LeaguesList';
import LeaguesTables from '../components/LeaguesTables';
import LoadingSpinner from '../../shared/UI/LoadingSpinner';

const Leagues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [leagues, setLeagues] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchLeaguesAndClubs = async () => {
      try {
        setIsLoading(true);

        const leaguesResponse = await fetch('http://localhost:5000/leagues');
        const leaguesData = await leaguesResponse.json();
        setLeagues(leaguesData.leagues);

        const clubsResponse = await fetch('http://localhost:5000/team/clubs');
        const clubsData = await clubsResponse.json();
        setClubs(clubsData.clubs);

        if (!leaguesResponse.ok || !clubsResponse.ok) {
          throw new Error('Failed to fetch data.');
        }

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchLeaguesAndClubs();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay/>
        </div>
      )}
      {!isLoading && leagues.length > 0 && clubs.length > 0 && (
        <div className='leagues-container'>
          <LeaguesList items={leagues} />
          <LeaguesTables items={leagues} clubs={clubs} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Leagues;
