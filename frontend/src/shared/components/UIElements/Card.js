import React from 'react';
import './Card.css';

// modal ubacit :D, 

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}

  /*return (
    const classes = 'card ' + props.className 

  return <div className={classes}>{props.children} </div>
    <div className={`card ${props.className}`} onClick={props.onClick}>
      <img src={props.image} alt="Card" className="card-image" />
      <p className="card-title">{props.title}</p>
    </div>
  );
};*/

export default Card;
 