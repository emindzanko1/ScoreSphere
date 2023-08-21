import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import './SearchBar.css';

const SearchBar = props => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [clubs, setClubs] = useState();
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

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/team/clubs`);

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

  const navigate = useNavigate();
  const inputRef = useRef(null);

  let values, flags, filteredValues;

  if (leagues && clubs) {
    values = leagues.map(league => league.title);
    values.push(...clubs.map(club => club.name));
    flags = leagues.map(league => league.image);
    flags.push(...clubs.map(club => club.image));
    filteredValues = values.filter(value => value.toLowerCase().startsWith(searchText.toLowerCase()));
  }

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
    inputRef.current.focus();
  };

  const handleSuggestedTeamClick = name => {

    const formattedName = name.toLowerCase().replace(/\s+/g, '-');

    const leagueMatch = leagues.find(league => league.title === name);

    let formattedLeagueName, formatedLeagueTitle, club, league;

    if (!leagueMatch) {
      club = clubs.find(c => c.name === name);
      league = leagues.find(l => l.id === club.league);
    }
    else {
      const leagueName = leagueMatch.name;
      const leagueTitle = leagueMatch.title;
      formattedLeagueName = leagueName.toLowerCase().replace(/\s+/g, '-');
      formatedLeagueTitle = leagueTitle.toLowerCase().replace(/\s+/g, '-')
    }

    leagueMatch
      ? navigate(`/${formattedLeagueName}/${formatedLeagueTitle}`)
      : navigate(`/team/${formattedName}`);
  };

  const getFlagForName = name => {
    const index = values.findIndex(value => value.toLowerCase() === name.toLowerCase());
    return flags[index];
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && leagues && clubs &&(
        <form className='search-form'>
          <input
            type='text'
            placeholder='Search'
            value={searchText}
            onChange={handleSearchInputChange}
            ref={inputRef}
          />
          <div className='suggestions-list'>
            {filteredValues.length > 0 ? (
              filteredValues.map((filteredValue, index) => (
                <div className='list' onClick={() => handleSuggestedTeamClick(filteredValue)} key={index}>
                  <img src={getFlagForName(filteredValue)} alt={`${filteredValue} flag`} /> {filteredValue}
                </div>
              ))
            ) : (
              <div className='no-matches'>No matches found.</div>
            )}
          </div>
          {searchText ? (
            <button type='button' onClick={handleClearSearch}>
              X
            </button>
          ) : (
            <button type='button' onClick={props.onCloseSearch}>
              Close
            </button>
          )}
        </form>
      )}
    </React.Fragment>
  );
};

export default SearchBar;
