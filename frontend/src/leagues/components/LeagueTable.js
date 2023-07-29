import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './LeagueTable.css';

const LeagueTable = props => {
  const navigate = useNavigate();

  const { league, teams, selectedClub } = props;

  const { country } = useParams();

  //const selectedLeague = leagues.find(l => l.name === country);

  if (!league) {
    return null;
  }

  const leagueClubs = teams.filter(team => team.leagueId === league.id);

  const teamNameClickHandler = (teamName, event) => {
    event.stopPropagation();
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${league.name}/${league.title}/${formattedTeamName}`);
  };

  return (
    <div className='league-table'>
      <Link to={`/${league.name}/${league.title}`} className='title-link' style={{ textDecoration: 'none' }}>
        <h2 className='title'>{league.title}</h2>
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
              <td className={`team-cell ${selectedClub && team.id === selectedClub.id ? 'selected' : ''}`}>
                <div className='team-container' onClick={e => teamNameClickHandler(team.name, e)}>
                  <span className='team-name'>{team.name}</span>
                </div>
              </td>
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
