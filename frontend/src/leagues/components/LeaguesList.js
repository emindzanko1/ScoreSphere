import React from 'react';
import LeagueItem from './LeagueItem';
import './LeaguesList.css';

const LeaguesList = props => {

  if (!props.items) {
    return <p>No leagues available.</p>;
  }

  return (
    <ul className='league-list'>
      {props.items.map(league => (
        <LeagueItem
         key={league.id}
         id={league.id}
         name={league.name}
         title={league.title}
         image={league.image}
         />
      ))}
    </ul>
  );
};

export default LeaguesList;
