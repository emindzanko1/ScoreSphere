import React from 'react';
import LeagueTable from './LeagueTable.js';
import './LeaguesTables.css'

const LeaguesTables = props => {
  if (!props.items) {
    return <p>No tables available.</p>;
  }

  return (
    <ul className='league-tables'>
      {props.items.map(league => (
        <LeagueTable key={league.id} id={league.id} name={league.name} title={league.title} clubs={league.clubs}/>
      ))}
    </ul>
  );
};

export default LeaguesTables;
