import React, { useState, useEffect } from 'react';
import LeaguesList from '../components/LeaguesList';
import LeaguesTables from '../components/LeaguesTables';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Leagues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [leagues, setLeagues] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/leagues');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLeagues(data.competitions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchLeagues();
  }, []);

  // const plCode = 'PL';
  // const blCode = 'BL1';
  // const saCode = 'SA';
  // const pdCode = 'PD';

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        // const responsePL =  await fetch(`http://localhost:5000/${plCode}/clubs`);
        // // const responsePL = await fetch('http://localhost:5000/PL/clubs');
        // const responseBL1 = await fetch(`http://localhost:5000/${blCode}/clubs`);
        // const responseSA = await fetch(`http://localhost:5000/${saCode}/clubs`);
        // const responsePD = await fetch(`http://localhost:5000/${pdCode}/clubs`);

        const responsePL = await fetch('http://localhost:5000/PL/clubs');
        const responseBL1 = await fetch('http://localhost:5000/BL1/clubs');
        const responseSA = await fetch('http://localhost:5000/SA/clubs');
        const responsePD = await fetch('http://localhost:5000/PD/clubs');

        if (!responsePL.ok || !responseBL1.ok || !responseSA.ok || !responsePD.ok) {
          throw new Error('API request failed');
        }
  
        const dataPL = await responsePL.json();
        const dataBL1 = await responseBL1.json();
        const dataSA = await responseSA.json();
        const dataPD = await responsePD.json();

        const combinedClubs = [...dataPL.teams, ...dataBL1.teams, ...dataSA.teams, ...dataPD.teams ];

        setClubs(combinedClubs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);
  if(clubs) {
    console.log(clubs.length);
  }


  const errorHandler = () => {
    setError(null);
  };

  let filteredLeagues;

  if(leagues) {
    filteredLeagues = leagues.filter(
      league =>
        !(
          league.area.name === 'Europe' ||
          league.area.name === 'Brazil' ||
          league.area.name === 'World' ||
          league.name === 'Championship' ||
          league.area.name === 'South America' ||
          league.name === 'Eredivisie' ||
          league.name === 'Ligue 1' ||
          league.name === 'Primeira Liga'
        )
    );
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && leagues  && clubs && (
        <div className='leagues-container'>
          <LeaguesList items={filteredLeagues} />
          <LeaguesTables items={filteredLeagues} clubs={clubs} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Leagues;

// useEffect(() => {
  //   const fetchLeaguesAndClubs = async () => {
  //     try {
  //       setIsLoading(true);

  //       const leaguesResponse = await fetch('http://localhost:5000/leagues');
  //       const leaguesData = await leaguesResponse.json();
  //       setLeagues(leaguesData.leagues);

  //       const clubsResponse = await fetch('http://localhost:5000/team/clubs');
  //       const clubsData = await clubsResponse.json();
  //       setClubs(clubsData.clubs);

  //       if (!leaguesResponse.ok || !clubsResponse.ok) {
  //         throw new Error('Failed to fetch data.');
  //       }

  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchLeaguesAndClubs();
  // }, []);
