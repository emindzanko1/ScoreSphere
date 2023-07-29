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

  //const values = ['apple', 'banana', 'orange'];

  const filteredValues = values.filter(value => value.toLowerCase().startsWith(searchText.toLowerCase()));

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
    //console.log(searchText);
    //props.onSearchChange(searchText);
  };

  const closeSearchHandler = event => {
    event.preventDefault();
    //setShowSearchBar(false);
    setSearchText('');
  };

  const handleSuggestedTeamClick = (teamName, e) => {
    //e .stopPropagation();
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${props.name}/${props.title}/${formattedTeamName}`);

   // navigate(`/leagues/${formattedTeamName}`);
    console.log(teamName);
  };

  const proba = () => {
    console.log('proba');
  };

  return (
    <form className='search-form'>
      <input type='text' placeholder='Search' value={searchText} onChange={handleSearchInputChange} />
      <ul >
        {filteredValues.map((filteredValue, index) => (
          <li onClick={e => handleSuggestedTeamClick(filteredValue, e)} key={index}>
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
