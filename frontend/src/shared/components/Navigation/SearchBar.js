import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DropDown from './DropDown';
import { leagues } from '../../../leagues/pages/Leagues';
import { clubs } from '../../../clubs/pages/Clubs';

import './SearchBar.css';

const SearchBar = props => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const values = leagues.map(league => `${league.name} ${league.title}`);
  values.push(...clubs.map(club => club.name));

  const filteredValues = values.filter(value => value.toLowerCase().startsWith(searchText.toLowerCase()));

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const closeSearchHandler = event => {
    event.preventDefault();
    setSearchText('');
  };

  const handleSuggestedTeamClick = teamName => {
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    const leagueMatch = leagues.find(league => `${league.name} ${league.title}` === teamName);

    let club, leagueId, league;

    if (!leagueMatch) {
      club = clubs.find(c => c.name === teamName);
      league = leagues.find(l => l.id === club.leagueId);
    }

    leagueMatch ? navigate(`/${leagueMatch.name}/${leagueMatch.title}`) : navigate(`/${league.name}/${league.title}/${formattedTeamName}`);
  };

  return (
    <form className='search-form'>
      <input type='text' placeholder='Search' value={searchText} onChange={handleSearchInputChange} />
      <ul className='suggestions-list '>
        {filteredValues.map((filteredValue, index) => (
          <li onClick={() => handleSuggestedTeamClick(filteredValue)} key={index}>
            {filteredValue}
          </li>
        ))}
      </ul>
      <button type='button' onClick={props.onCloseSearch}>
        Close
      </button>
    </form>
  );
};

export default SearchBar;
