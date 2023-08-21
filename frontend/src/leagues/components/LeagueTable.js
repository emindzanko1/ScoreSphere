import React, { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './LeagueTable.css';

const LeagueTable = props => {
  const navigate = useNavigate();

  const { league, teams, selectedClub, image } = props;

  const [hoveredRow, setHoveredRow] = useState(null);

  const rowTimeoutRef = useRef(null);

  const onMouseRowEnterHandler = index => {
    clearTimeout(rowTimeoutRef.current);
    rowTimeoutRef.current = setTimeout(() => {
      setHoveredRow(index);
    }, 1000);
  };

  const onMouseRowLeaveHandler = () => {
    clearTimeout(rowTimeoutRef.current);
    setHoveredRow(null);
  };

  if (!league) {
    return null;
  }

  const leagueClubs = teams.filter(team => team.league === league.id);

  const teamNameClickHandler = (teamName, event) => {
    event.stopPropagation();
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/team/${formattedTeamName}`);
  };

  const formattedName = league.name.toLowerCase().replace(/\s+/g, '-');
  const formattedTitle = league.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className='league-table'>
      <Link to={`/tournament/${formattedName}/${formattedTitle}`} className='title-link' style={{ textDecoration: 'none' }}>
        <h2 className='title'>
          {league.title}
          <img src={image} alt={image} />
        </h2>
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
            <tr
              key={index}
              onMouseEnter={() => onMouseRowEnterHandler(index)}
              onMouseLeave={onMouseRowLeaveHandler}
              onClick={e => teamNameClickHandler(team.name, e)}
            >
              <td>
                <span className='position'> {index + 1}</span>
              </td>
              <td className={`league-team-cell ${selectedClub && team.id === selectedClub.id ? 'selected' : ''}`}>
                <div className='league-team-container'>
                  <img src={team.image} alt={team.image} />
                  <span className='league-team-name'>{team.name}</span>
                  {hoveredRow === index && <span className='tooltip'>Click for team details!</span>}
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
