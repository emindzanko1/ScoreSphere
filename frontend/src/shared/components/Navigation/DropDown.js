import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { leagues } from '../../../leagues/pages/Leagues';
import { clubs } from '../../../clubs/pages/Clubs';

import './DropDown.css';

const DropDown = props => {

  /*const navigate = useNavigate();

  const values = leagues.map(league => `${league.name} ${league.title}`);
  values.push(...clubs.map(club => club.name));

  const filteredValues = values.filter(value => value.toLowerCase().startsWith(props.searchText.toLowerCase()));

  const handleSuggestedTeamClick = teamName => {
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    const leagueMatch = leagues.find(league => `${league.name} ${league.title}` === teamName);

    let club, leagueId, league;

    if (!leagueMatch) {
      club = clubs.find(c => c.name === teamName);
      league = leagues.find(l => l.id === club.leagueId);
    }

    leagueMatch
      ? navigate(`/${leagueMatch.name}/${leagueMatch.title}`)
      : navigate(`/${league.name}/${league.title}/${formattedTeamName}`);
  };

  <ul className='suggestions-list '>
    {filteredValues.map((filteredValue, index) => (
      <li onClick={() => handleSuggestedTeamClick(filteredValue)} key={index}>
        {filteredValue}
      </li>
    ))}
  </ul>;*/
};

export default DropDown;
