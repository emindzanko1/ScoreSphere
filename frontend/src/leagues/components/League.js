import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LeagueTable from './Table';
import LeaguesTables from '../components/LeaguesTables';
import Table from './Table';
import { clubs } from '../../clubs/pages/Clubs';

const capitalizeWords = str => {
  const smallWords = ['and', 'is', 'of'];
  return str
    .split('-') // Split on hyphens instead of spaces
    .map((word, index) =>
      smallWords.includes(word.toLowerCase()) && index !== 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' '); // Join with spaces instead of hyphens
};

const League = props => {

  const { leagues } = props;
  const { country, league } = useParams();
  const capitalizedCountry = capitalizeWords(country);
  const navigate = useNavigate();


  const selectedLeague = leagues.find(l => l.name === country && l.title === league);

  if (!selectedLeague) {
    navigate(`/`);
    return null;
  }


  const leagueClubs = clubs.filter(club => club.leagueId === selectedLeague.id);

  return (
    <div>
      <h2>Welcome to {capitalizedCountry}!</h2>
      <Table
        key={selectedLeague.id}
        id={selectedLeague.id}
        name={selectedLeague.name}
        title={selectedLeague.title}
        clubs={leagueClubs}
      />
      <Link to='/'>Go back to homepage</Link>
    </div>
  );
};

export default League;
