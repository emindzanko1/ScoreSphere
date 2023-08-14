import React from 'react';
import Table from './Table.js';
import './LeaguesTables.css'
import { clubs } from '../../clubs/pages/Clubs';


const LeaguesTables = props => {
  if (!props.items) {
    return <p>No tables available.</p>;
  }

  console.log(props.items[0].id);

  return (
    <ul className='league-tables'>
      {props.items.map(league => {
        const leagueClubs = clubs.filter(club => club.leagueId === league.id);
        return <Table key={league.id} id={league.id} name={league.name} title={league.title} clubs={leagueClubs} image={league.image}/>;
      })}
    </ul>
  );

};

export default LeaguesTables;
