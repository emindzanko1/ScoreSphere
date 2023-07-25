import React from 'react';
import ClubDetails from './ClubDetails';

import './ClubList.css';
import { useParams } from 'react-router-dom';

const ClubsList = props => {
  const { clubs, leagues } = props;
  const { club } = useParams();

  if (!props.clubs) {
    return <p>No clubs available.</p>;
  }

  const myClub = clubs.find(clubItem => clubItem.name.toLowerCase().replace(/\s+/g, '-') === club);

  const myLeague = leagues.find(league => league.id === myClub.leagueId);

  return (
    <ul>
      <ClubDetails
        key={myClub.id}
        id={myClub.id}
        name={myClub.name}
        image={myClub.image}
        leagueId={myClub.leagueId}
        league={myLeague}
      />
    </ul>
  );
};

export default ClubsList;
