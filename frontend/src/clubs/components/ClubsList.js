import React, { useEffect, useState } from 'react';
import ClubDetails from './ClubDetails';
import './ClubList.css';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const ClubsList = props => {
  const { clubs, leagues } = props;
  const { club } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [myClub, setMyClub] = useState(null);

  useEffect(() => {
    if (!clubs) {
      setIsLoading(false);
      return;
    }

    const foundClub = clubs.find(clubItem => clubItem.shortName.toLowerCase().replace(/\s+/g, '-') === club);
    setMyClub(foundClub);
    setIsLoading(false);
  }, [clubs, club]);

  console.log(myClub);

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!myClub) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  let myLeague, clubIndex, nextClubIndex, myClubs;

  if (myClub) {
    myLeague = leagues.find(league => league.id === myClub.runningCompetitions[0].id);

    clubIndex = clubs.findIndex(clubItem => clubItem.id === myClub.id);

    nextClubIndex = clubIndex % 2 === 0 ? (clubIndex + 1) % clubs.length : (clubIndex - 1) % clubs.length;

    myClubs = nextClubIndex > clubIndex ? [myClub, clubs[nextClubIndex]] : [clubs[nextClubIndex], myClub];
  }

  return (
    <ul>
      <ClubDetails
        key={myClub.id}
        id={myClub.id}
        name={myClub.name}
        image={myClub.crest}
        club={myClub}
        league={myLeague}
        myClubs={myClubs}
        clubs={clubs}
      />
    </ul>
  );
};

export default ClubsList;
