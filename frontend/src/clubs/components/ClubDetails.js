import React from 'react';
import './ClubDetails.css';

const ClubDetails = props => {

  const league = props.league;

  const name = league.name.charAt(0).toUpperCase() + props.league.name.slice(1);

  return (
    <div className="container">
    <h1>{name}</h1>
      <h2 className="club-name">{props.name}</h2>
      <div className="club-image-container">
        <img src={props.image} alt={props.name} className="club-image" />
      </div>
    </div>
  );

};

export default ClubDetails;
