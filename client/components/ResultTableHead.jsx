// TableHead.js
import React from 'react';
import '../styles/ResultTable.css';

const TableHead = () => {
  return (
    <thead className='table-head'>
      <tr>
        <th></th>
        <th>Time</th>
        <th></th>
        <th>Home Team</th>
        <th>Score</th>
        <th>Away Team</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHead;
