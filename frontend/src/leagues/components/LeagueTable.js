import React from 'react';

const LeagueTable = props => {
    
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}. ${hours}.${minutes}`;
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
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {props.clubs.map((club, index) => {
            if (index % 2 === 0 && index + 1 < props.clubs.length) {
              const awayTeam = props.clubs[index + 1];
              return (
                <tr key={index}>
                  <td className='date-time-cell'>{getCurrentDate()}</td>
                  <td>{club}</td>
                  <td>{awayTeam}</td>
                  <td className='results'>1:0</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
