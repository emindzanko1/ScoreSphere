import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import MatchModal from '../../matches/components/MatchModal';

import './Table.css';

const Table = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [table, setTable] = useState([]);

  const { name, title, code } = props;

  let formattedName, formattedTitle, formattedCode;

  if (name && title && code) {
    formattedName = name.toLowerCase().replace(/\s+/g, '-');
    formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    formattedCode = code.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${formattedCode}/matches`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTable(data.matches);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTable();
  }, [code]);

  if (table) {
    console.log(table);
  }

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
    navigate(`/team/${formattedTeamName}`);
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

  const formatMatchDate = utcDate => {
    const date = new Date(utcDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}. ${hours}:${minutes}`;
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading  && (
        <div key={props.id} className='table'>
          <Link
            to={`/tournament/${formattedName}/${formattedTitle}/${formattedCode}`}
            className='title-link'
            style={{ textDecoration: 'none' }}
          >
            <h2 className='title'>
              {title}
              <img src={props.image} alt={props.image} />
            </h2>
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
              {table.map((match, index) => (
                <tr
                  key={match.id}
                  ref={rowRef}
                  onClick={() => rowClickHandler(match)}
                  className={`clickable-row ${hoveredRow === index ? 'hovered' : ''}`}
                  onMouseEnter={() => onMouseRowEnterHandler(index)}
                  onMouseLeave={onMouseRowLeaveHandler}
                >
                  <td className='date-time-cell'>{formatMatchDate(match.utcDate)}</td>
                  <td className='team-cell'>
                    <div
                      className='team-container'
                      onMouseEnter={() => onMouseTeamEnterHandler(match.homeTeam)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      onClick={e => teamNameClickHandler(match.homeTeam.shortName, e)}
                    >
                      <img src={match.homeTeam.crest} alt={match.homeTeam.crest} />
                      <span className='team-name'>{match.homeTeam.shortName}</span>
                      {hoveredTeam === match.homeTeam ? (
                        <span className='tooltip'>Click for team details!</span>
                      ) : (
                        hoveredRow === index && <span className='tooltip'>Click for match details!</span>
                      )}
                    </div>
                  </td>
                  <td className='team-cell'>
                    <div
                      className='team-container'
                      onMouseEnter={() => onMouseTeamEnterHandler(match.awayTeam)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      onClick={e => teamNameClickHandler(match.awayTeam.shortName, e)}
                    >
                      <img src={match.awayTeam.crest} alt={match.awayTeam.crest} />
                      <span className='team-name'>{match.awayTeam.shortName}</span>
                      {hoveredTeam === match.awayTeam && <span className='tooltip'>Click for team details!</span>}
                    </div>
                  </td>
                  <td className='results'>{`${match.score.fullTime.home ?? '-'}:${
                    match.score.fullTime.away ?? '-'
                  }`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedMatch && (
            <MatchModal
              show={true}
              onClose={() => setSelectedMatch(null)}
              title={title}
              homeTeam={selectedMatch.homeTeam.shortName}
              awayTeam={selectedMatch.awayTeam.shortName}
              homeTeamImage={selectedMatch.homeTeam.crest}
              awayTeamImage={selectedMatch.awayTeam.crest}
              dateTime={formatMatchDate(selectedMatch.utcDate)}
              result={`${selectedMatch.score.fullTime.home ?? '-'}:${selectedMatch.score.fullTime.away ?? '-'}`}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
