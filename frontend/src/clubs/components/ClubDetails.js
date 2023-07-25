import React from 'react';
import { useParams } from 'react-router-dom';

import './ClubDetails.css';

const ClubDetails = props => { 

  return (
    <div className="container">
    <h1>{props.leagueId}</h1>
      <h2 className="club-name">{props.name}</h2>
      <div className="club-image-container">
        <img src={props.image} alt={props.name} className="club-image" />
      </div>
    </div>
  );

};

export default ClubDetails;
