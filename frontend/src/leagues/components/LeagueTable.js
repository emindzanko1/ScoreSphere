import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LeagueTable = props => {

  const { leagues, teams } = props;
  
  const { country } = useParams();
  
  const selectedLeague = leagues.find(l => l.name === country);
  
  if (!selectedLeague) {
    return null;
  }
  
  const leagueClubs = teams.filter(team => team.leagueId === selectedLeague.id);

  return (
    <div className='league-table'>
      <Link to={`/${selectedLeague.name}/${selectedLeague.title}`} className='title-link' style={{ textDecoration: 'none' }}>
        <h2 className='title'>{selectedLeague.title}</h2>
      </Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Goals</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {leagueClubs.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0:0</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
