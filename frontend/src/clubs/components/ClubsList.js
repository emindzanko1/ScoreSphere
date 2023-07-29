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

  const clubIdNumber = parseInt(myClub.id.slice(1), 10);
  let myClubs;


  const opponentId = clubIdNumber % 2 === 0 ? clubIdNumber - 1 : clubIdNumber + 1;
  console.log(opponentId);

  const opponentClub = clubs.find(c => parseInt(c.id.slice(1), 10) === opponentId);

  myClubs = clubIdNumber < opponentId ? [myClub, opponentClub] : [opponentClub, myClub];
 

  return (
    <ul>
      <ClubDetails
        key={myClub.id}
        id={myClub.id}
        name={myClub.name}
        image={myClub.image}
        leagueId={myClub.leagueId}
        club = {myClub}
        league={myLeague}
        clubs={myClubs}
      />
    </ul>
  );
};

export default ClubsList;
