import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './LeagueTable.css';

const LeagueTable = props => {
  const navigate = useNavigate();

  const { league, teams, selectedClub, image, code } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [table, setTable] = useState([]);

  let formattedName, formattedTitle, formattedCode;

  if (league) {
    formattedName = league.name.toLowerCase().replace(/\s+/g, '-');
    formattedTitle = league.area.name.toLowerCase().replace(/\s+/g, '-');
    formattedCode = league.code.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${formattedCode}/standings`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTable(data.standings[0].table);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTable();
  }, [code]);

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

  const teamNameClickHandler = (teamName, event) => {
    event.stopPropagation();
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/team/${formattedTeamName}`);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading  && (
        <div className='league-table'>
          <Link
            to={`/tournament/${formattedName}/${formattedTitle}/${formattedCode}`}
            className='title-link'
            style={{ textDecoration: 'none' }}
          >
            <h2 className='title'>
              {league.area.name}
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
              {table.map((entry, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => onMouseRowEnterHandler(index)}
                  onMouseLeave={onMouseRowLeaveHandler}
                  onClick={e => teamNameClickHandler(entry.team.name, e)}
                >
                  <td>
                    <span className='position'> {entry.position}</span>
                  </td>
                  <td
                    className={`league-team-cell ${
                      selectedClub && entry.team.id === selectedClub.id ? 'selected' : ''
                    }`}
                  >
                    <div className='league-team-container'>
                      <img src={entry.team.crest} alt={entry.team.crest} />
                      <span className='league-team-name'>{entry.team.name}</span>
                      {hoveredRow === index && <span className='tooltip'>Click for team details!</span>}
                    </div>
                  </td>
                  <td>{entry.playedGames}</td>
                  <td>{entry.won}</td>
                  <td>{entry.draw}</td>
                  <td>{entry.lost}</td>
                  <td>
                    {entry.goalsFor}:{entry.goalsAgainst}
                  </td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default LeagueTable;
