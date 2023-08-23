import React from 'react';
import LeagueItem from './LeagueItem';
import './LeaguesList.css';

const LeaguesList = props => {
  if (!props.items || props.items.length === 0) {
    return <p>No leagues available.</p>;
  }

  return (
    <ul className='league-list'>
      {props.items.map(league => (
        <LeagueItem
          key={league.id}
          id={league.id}
          /*name={league.slug}
          title={league.name}*/
          name={league.name}
          title={league.area.name}
          code={league.code}
          //image={league.logo}
          image={league.emblem}
        />
      ))}
    </ul>
  );
};

export default LeaguesList;
