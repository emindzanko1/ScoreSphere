import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MatchModal from '../../matches/components/MatchModal';

import './Table.css';

const Table = props => {
  const getCurrentDate = matchTime => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const [hours, minutes] = matchTime.split(':');
    return `${day}.${month}. ${hours}:${minutes}`;
  };

  const calculateMatchTime = startTime => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');

    const startDateTime = new Date(`${currentYear}-${currentMonth}-${currentDay}T${startTime}:00`);
    const currentDateTime = new Date();
    const diffInMinutes = Math.floor((currentDateTime - startDateTime) / 60000);

    switch (true) {
      case diffInMinutes > 105:
        return 'The End';
      case diffInMinutes >= 90 && diffInMinutes <= 105:
      case diffInMinutes > 60 && diffInMinutes < 90:
        return `${diffInMinutes - 15}'`;
      case diffInMinutes > 45 && diffInMinutes <= 60:
        return 'Half Time';
      case diffInMinutes <= 0:
        return getCurrentDate(startTime);
      default:
        return `${diffInMinutes}'`;
    }
  };

  const matchTime = '17:00';
  const newMatchTime = calculateMatchTime(matchTime);

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
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${props.name}/${props.title}/${formattedTeamName}`);
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
    clearTimeout(rowTimeoutRef.current);
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

  if (!Array.isArray(props.clubs)) {
    return <p>No clubs available.</p>;
  }

  return (
    <div key={props.id} className='table'>
      <Link to={`/${props.name}/${props.title}`} className='title-link' style={{ textDecoration: 'none' }}>
        <h2 className='title'>
          {props.title}
          <img src={props.image} alt={props.image}/>
        </h2>
      </Link>
      <table>
        <thead>
          <tr>
            {newMatchTime !== getCurrentDate(matchTime) ? <th>Match Time</th> : <th>Date & Time</th>}
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
                dateTime: getCurrentDate(matchTime),
                homeTeam: club.name,
                awayTeam: awayTeam.name,
                result: '0:0',
                homeTeamImage: club.image,
                awayTeamImage: awayTeam.image,
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
                  <td className='date-time-cell'>{newMatchTime}</td>
                  <td className='team-cell'>
                    <div
                      className='team-container'
                      onMouseEnter={() => onMouseTeamEnterHandler(club)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      onClick={e => teamNameClickHandler(club.name, e)}
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
                      onClick={e => teamNameClickHandler(awayTeam.name, e)}
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
        <MatchModal
          show={true}
          onClose={() => setSelectedMatch(null)}
          title={props.title}
          newMatchTime={newMatchTime}
          {...selectedMatch}
        />
      )}
    </div>
  );
};

export default Table;
