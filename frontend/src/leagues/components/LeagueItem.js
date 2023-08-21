import React from 'react';
import { Link } from 'react-router-dom';
import './LeagueItem.css';

const LeagueItem = props => {
  const { name, title } = props;

  const formatedName = name.toLowerCase().replace(/\s+/g, '-');
  const formatedTitle = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <li className='league-item'>
      <Link to={`tournament/${formatedName}/${formatedTitle}`} className='league-item__link' style={{ textDecoration: 'none' }}>
        <div className='league-item__content'>
          <div className='league-item__image'>
            <img src={props.image} alt={props.name} className='league-item__image-img' />
          </div>
          <div className='league-item__info'>
            <h2 className='league-item__title'>{props.title}</h2>
            <h3 className='league-item__name'>{props.name}</h3>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LeagueItem;
