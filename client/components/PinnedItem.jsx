import React from 'react';
import { MdPushPin } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../styles/PinnedItem.css';

const PinnedItem = ({ id, name, emblem, type, onUnpin, link }) => {
  return (
    <Link to={link} key={id} className='pinned-item'>
      <img src={emblem} alt={`${name} flag`} />
      <div className='name'>{name}</div>
      <div className='unpin-tooltip'>
        <span className='tooltiptext'>
          Remove this {type} from your Pinned {type === 'league' ? 'Leagues' : 'Teams'}!
        </span>
        <MdPushPin className='unpin-icon' onClick={e => onUnpin(e, id, type)} />
      </div>
    </Link>
  );
};

export default PinnedItem;
