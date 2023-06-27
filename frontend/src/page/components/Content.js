import React from "react";
import { Link } from 'react-router-dom';

const Content = props => {
    return (
    <Link to={props.routePath} className={`card ${props.className}`} onClick={props.onClick}>
      <img src={props.image} alt="Card" className="card-image" />
      <p className="card-title">{props.title}</p>
    </Link>
  );
}

export default Content;