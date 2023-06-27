import React from 'react';
import { Link } from 'react-router-dom';
import './LeagueItem.css';

const LeagueItem = props => {
  return (
    <li className="league-item">
      <Link to={`/${props.name}/${props.title}`} className="league-item__link">
        <div className="league-item__content">
          <div className="league-item__image">
            <img src={props.image} alt={props.name} className="league-item__image-img" />
          </div>
          <div className="league-item__info">
            <h2 className="league-item__title">{props.title}</h2>
            <h3 className="league-item__name">{props.name}</h3>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LeagueItem;


/*import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';

import './LeagueItem.css';

const LeagueItem = props => {
    return (
        <li className="league-item">
          <Card className="league-item__content">
            <Link to={`/${props.name}/${props.title}`}>
              <div className="league-item__image">
                <Avatar image={props.image} alt={props.name} />
              </div>
              <div className="league-item__info">
                <h2><b>{props.title}</b></h2>
              </div>
              <div>
                <h3>{props.name}</h3>
              </div>
            </Link>
          </Card>
        </li>
      );
    
}

export default LeagueItem;*/
