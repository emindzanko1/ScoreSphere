import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MatchModal from '../../matches/components/MatchModal';

import './Table.css';

const Table = props => {
  
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}. ${hours}:${minutes}`;
  };

  const [selectedMatch, setSelectedMatch] = useState(null);

  const rowTimeoutRef = useRef(null);
  const teamTimeoutRef = useRef(null);

  const rowClickHandler = match => {
    setSelectedMatch(match);
  };

  const navigate = useNavigate();
  const rowRef = useRef(null);

  const teamNameClickHandler = (teamName, event) => {
    event.stopPropagation();
    //console.log(`Clicked on team name: ${teamName}`);
    // ovo kasnije
    //navigate(`/team/${teamName}`);
    // VRATITI SE na ovonavigate(`/${props.name}/${props.title}/${teamName}`);
    navigate(`/`);
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const onMouseRowEnterHandler = index => {
    clearTimeout(rowTimeoutRef.current);
    rowTimeoutRef.current = setTimeout(() => {
      setHoveredRow(index);
      setHoveredTeam(null);
    }, 1000);
  };

  const onMouseRowLeaveHandler = () => {
    clearTimeout(rowTimeoutRef.current);
    setHoveredRow(null);
  };

  const [hoveredTeam, setHoveredTeam] = useState(null);

  const onMouseTeamEnterHandler = team => {
    clearTimeout(rowTimeoutRef.current); // Clear any existing timeout
    teamTimeoutRef.current = setTimeout(() => {
      setHoveredTeam(team);
      setHoveredRow(null);
    }, 500);
  };

  const onMouseTeamLeaveHandler = () => {
    clearTimeout(teamTimeoutRef.current);
    setHoveredTeam(null);
    if (rowRef.current) {
      rowRef.current.dispatchEvent(new MouseEvent('mouseenter'));
    }
  };

  if (!Array.isArray(props.clubs) ) {
    console.log(typeof props.clubs);
    return <p>No clubs available.</p>;
  }

 /* return (
    <div className='league-table'>
      <table >
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Result</th>
          </tr>
        </thead>
      </table>
    </div>
  ); */

   return (
    <div key={props.id} className='league-table'>
      <Link to={`/${props.name}/${props.title}`} className='title-link' style={{ textDecoration: 'none' }}>
        <h2 className='title'>{props.title}</h2>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {props.clubs.map((club, index) => {
            if (index % 2 === 0 && index + 1 < props.clubs.length) {
              const awayTeam = props.clubs[index + 1];
              const match = {
                dateTime: getCurrentDate(),
                homeTeam: club.name,
                awayTeam: awayTeam.name,
                result: '0:0',
              };
              return (
                <tr
                  key={index}
                  ref={rowRef}
                  onClick={() => rowClickHandler(match)}
                  className={`clickable-row ${hoveredRow === index ? 'hovered' : ''}`}
                  onMouseEnter={() => onMouseRowEnterHandler(index)}
                  onMouseLeave={onMouseRowLeaveHandler}
                >
                  <td className='date-time-cell'>{getCurrentDate()}</td>
                  <td className='team-cell'>
                    <div
                      className='team-container'
                      onMouseEnter={() => onMouseTeamEnterHandler(club)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      onClick={e => teamNameClickHandler(club, e)}
                    >
                      <span className='team-name'>{club.name}</span>
                      {hoveredRow === index && <span className='tooltip'>Click for match details!</span>} 
                      {hoveredTeam === club && <span className='tooltip'>Click for team details!</span>}
                    </div>
                  </td>
                  <td className='team-cell'>
                    <div
                      className='team-container'
                      onMouseEnter={() => onMouseTeamEnterHandler(awayTeam)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      onClick={e => teamNameClickHandler(awayTeam, e)}
                    >
                      <span className='team-name'>
                        {hoveredTeam === awayTeam && <span className='tooltip'>Click for team details!</span>}
                        {awayTeam.name}
                      </span>
                    </div>
                  </td>
                  <td className='results'>0:0</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      {selectedMatch && (
        <MatchModal show={true} onClose={() => setSelectedMatch(null)} title={props.title} {...selectedMatch} />
      )}
    </div>
  );
};

export default Table;
