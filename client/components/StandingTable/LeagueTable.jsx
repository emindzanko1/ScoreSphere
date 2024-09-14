import React from 'react';
import TableHead from './StandingTableHead';
import TableRow from './StandingTableRow';
// import '../styles/LeagueTable.css'; 

const LeagueTable = ({ standings }) => {
  return (
    <div className='league-table'>
      <h3>Standings</h3>
      <table>
        <TableHead />
        <tbody>
          {standings.map(team => (
            <TableRow key={team.team.id} team={team} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
