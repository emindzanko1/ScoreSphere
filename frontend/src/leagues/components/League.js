import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Table from './Table';
import LeagueTable from './LeagueTable';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './League.css';

const League = () => {
  const [activeTable, setActiveTable] = useState('table');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [cleague, setLeague] = useState();
  const [clubs, setClubs] = useState();
  const { country, league, code } = useParams();

  const handleFixturesClick = () => {
    setActiveTable('table');
    //navigate(`./fixtures`);
  };

  const handleTableClick = () => {
    setActiveTable('leagueTable');
    //navigate(`./table`);
  };

  const formatName = cname => {
    const words = cname.split('-');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  };

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`http://localhost:5000/league`);

  //       const responseData = await response.json();
  //       setLeague(responseData.league);

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
  // }, [country, league]);

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${code}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLeague(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchLeague();
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/${code}/clubs`);

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();

        setClubs(data.teams);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && cleague && clubs && (
        <div className='league-title'>
          <h2>Welcome to {formatName(country)}!</h2>
          <div className='league-container'>
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
                key={cleague.id}
                id={cleague.id}
                name={cleague.name}
                title={cleague.area.name}
                clubs={clubs}
                image={cleague.area.flag}
              />
            ) : (
              <LeagueTable key={cleague.id} id={cleague.id} league={cleague} teams={clubs} image={cleague.area.flag} />
            )}
            <Link to='/' className='link'>
              <div className='button-container'>
                <button>Homepage</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default League;
