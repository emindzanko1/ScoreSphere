
import React from "react";
import { Link } from "react-router-dom";

const Brazil = () => {
  return (
    <div>
      <h2>Dobro došao u Brazil!</h2>
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Brazil;


/*import React from "react";
import { Link } from "react-router-dom";

const Brazil = props => {
  const { leagueData } = props;

  return (
    <div>
      <h2>{leagueData.title}</h2>
      <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {leagueData.clubs.map((club, index) => {
            if (index % 2 === 0 && index + 1 < leagueData.clubs.length) {
              const awayTeam = leagueData.clubs[index + 1];
              return (
                <tr key={index}>
                  <td>{club}</td>
                  <td>{awayTeam}</td>
                  <td>1:0</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Brazil;*/

