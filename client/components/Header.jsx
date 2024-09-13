import React from 'react';
import NavLinks from './NavLink';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header>
        <div className='title'>
          <Link to='/'>ScoreSphere</Link>
        </div>
        <NavLinks />
      </header>
    </>
  );
};

export default Header;
