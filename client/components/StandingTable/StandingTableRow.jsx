import React from 'react';

const TableRow = ({ team }) => {
  return (
    <tr>
      <td>{team.position}</td>
      <td className='team-info'>
        <img src={team.team.crest} alt={`${team.team.name} crest`} className='team-crest' />
        {team.team.name}
      </td>
      <td>{team.playedGames}</td>
      <td>{team.won}</td>
      <td>{team.draw}</td>
      <td>{team.lost}</td>
      <td>{team.goalsFor}</td>
      <td>{team.goalsAgainst}</td>
      <td>{team.goalDifference}</td>
      <td>{team.points}</td>
    </tr>
  );
};

export default TableRow;
