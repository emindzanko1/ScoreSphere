import React from 'react';
import { formatMatchDate } from '../util/helpers';
import '../styles/LeagueDetail.css';

const MatchesList = ({ matches, type }) => {
  let lastMatchday = null;

  return (
    <ul>
      {matches.map((match, index) => {
        const isNewMatchday = match.matchday !== lastMatchday;
        lastMatchday = match.matchday;

        return (
          <React.Fragment key={index}>
            {isNewMatchday && (
              <li className='matchday-header'>
                <h4>Matchday {match.matchday}</h4>
              </li>
            )}
            {type === 'schedule' ? (
              <li>
                {formatMatchDate(match.utcDate)} {match.homeTeam.name} - : - {match.awayTeam.name}
              </li>
            ) : (
              <li>
                {formatMatchDate(match.utcDate)} {match.homeTeam.name} {match.score.fullTime.home} -{' '}
                {match.score.fullTime.away} {match.awayTeam.name}
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MatchesList;
