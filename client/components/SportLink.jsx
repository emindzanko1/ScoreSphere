import { useState } from 'react';
import '../styles/SportLink.css';
import { NavLink } from 'react-router-dom';

const SportLink = () => {
  const [activeLink, setActiveLink] = useState('football');

  const handleActive = index => {
    setActiveLink(index);
  };

  return (
    <div className='sports-links'>
      <NavLink
        to='favorites'
        className={activeLink === 'favorites' ? 'active' : ''}
        onClick={() => handleActive('favorites')}
      >
        Favorites
      </NavLink>
      <NavLink
        to='football'
        className={activeLink === 'football' ? 'active' : ''}
        onClick={() => handleActive('football')}
      >
        Football
      </NavLink>
    </div>
  );
};
export default SportLink;
