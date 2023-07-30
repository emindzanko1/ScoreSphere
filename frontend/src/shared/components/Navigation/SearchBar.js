import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { leagues } from '../../../leagues/pages/Leagues';
import { clubs } from '../../../clubs/pages/Clubs';

import './SearchBar.css';

const SearchBar = props => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const values = leagues.map(league => league.title);
  values.push(...clubs.map(club => club.name));

  const flags = leagues.map(league => league.image);
  flags.push(...clubs.map(club => club.image));

  const filteredValues = values.filter(value => value.toLowerCase().startsWith(searchText.toLowerCase()));

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
    inputRef.current.focus();
  };

  const handleSuggestedTeamClick = teamName => {
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');

    const leagueMatch = leagues.find(league => league.title === teamName);

    let club, league;

    if (!leagueMatch) {
      club = clubs.find(c => c.name === teamName);
      league = leagues.find(l => l.id === club.leagueId);
    }

    leagueMatch
      ? navigate(`/${leagueMatch.name}/${leagueMatch.title}`)
      : navigate(`/${league.name}/${league.title}/${formattedTeamName}`);
  };

  const getFlagForName = name => {
    const index = values.findIndex(value => value.toLowerCase() === name.toLowerCase());
    return flags[index];
  };

  return (
    <form className='search-form'>
      <input type='text' placeholder='Search' value={searchText} onChange={handleSearchInputChange} ref={inputRef} />
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
  );
};

export default SearchBar;
