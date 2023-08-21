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
  const { country, league } = useParams();

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

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/tournament/${country}/${league}`);

        const responseData = await response.json();
        setLeague(responseData.league);

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
  }, [country, league]);


  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/team/clubs/${league}`);

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
  }, [country, league]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && clubs && cleague &&(
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
                title={cleague.title}
                clubs={clubs}
                image={cleague.image}
              />
            ) : (
              <LeagueTable league={cleague} teams={clubs} image={cleague.image} />
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
