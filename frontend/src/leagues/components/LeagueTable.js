import React, {useState} from 'react';
import MatchModal from '../../matches/components/MatchModal';

import './LeagueTable.css';

const LeagueTable = props => {

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}. ${hours}:${minutes}`;
  };

  const [selectedMatch, setSelectedMatch] = useState(null);

  const rowClickHandler = match => {
    setSelectedMatch(match);
  };


  return (
    <div key={props.id} className='league-table'>
      <h2 className='title'>{props.title}</h2>
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
                homeTeam: club,
                awayTeam: awayTeam,
                result: '0:0', 
              };
              return (
                <tr key={index} onClick={() => rowClickHandler(match)} className="clickable-row">
                  <td className='date-time-cell'>{getCurrentDate()}</td>
                  <td  className='team-cell'>{club}</td>
                  <td  className='team-cell'>{awayTeam}</td>
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
          {...selectedMatch}
        />
      )}
    </div>
  );
};

export default LeagueTable;
