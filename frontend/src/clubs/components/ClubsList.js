import React from 'react';
import ClubDetails from './ClubDetails';

import './ClubList.css';
import { useParams } from 'react-router-dom';

const ClubsList = props => {

  const { club } = useParams();

  if (!props.clubs) {
    return <p>No clubs available.</p>;
  }

  const myClub = props.clubs.filter(
    clubItem => clubItem.name.toLowerCase().replace(/\s+/g, '-') === club 
  );

  return (
    <ul>
      {myClub.map(club => (
        <ClubDetails key={club.id} id={club.id} name={club.name} image={club.image} leagueId={club.leagueId} />
      ))}
    </ul>
  );
};

export default ClubsList;

