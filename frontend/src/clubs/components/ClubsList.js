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

  if (!myClub) {
    return <p>Club not found.</p>;
  }

  const myLeague = leagues.find(league => league.id === myClub.league);

  const clubIndex = clubs.findIndex(clubItem => clubItem.id === myClub.id);

  let nextClubIndex;
  if (clubIndex % 2 === 0) {
    nextClubIndex = (clubIndex + 1) % clubs.length;
  }
  else {
    nextClubIndex = (clubIndex - 1) % clubs.length;
  }

  const myClubs = [myClub, clubs[nextClubIndex]];

  return (
    <ul>
      <ClubDetails
        key={myClub.id}
        id={myClub.id}
        name={myClub.name}
        image={myClub.image}
        leagueId={myClub.league}
        club={myClub}
        league={myLeague}
        myClubs={myClubs}
        clubs={clubs}
      />
    </ul>
  );
};

export default ClubsList;
