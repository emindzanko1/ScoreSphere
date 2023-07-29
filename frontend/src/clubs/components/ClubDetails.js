import React from 'react';
import Table from '../../leagues/components/Table';

import './ClubDetails.css';

const ClubDetails = props => {
  const club = props.club;
  const league = props.league;
  const name = league.name.charAt(0).toUpperCase() + props.league.name.slice(1);

  return (
    <div className='container'>
      <h1>{name}</h1>
      <div className='club-image-container'>
        <img src={club.image} alt={club.name} className='club-image' />
      </div>
      <h2 className='club-name'>{club.name}</h2>
      <div className='button-container'>
        <button>Fixtures</button>
        <button>Table</button>
      </div>
      <Table
        key={league.id}
        id={league.id}
        name={league.name}
        title={league.title}
        clubs={props.clubs}
        //clubs={[club]}
      />
    </div>
  );
};

export default ClubDetails;
