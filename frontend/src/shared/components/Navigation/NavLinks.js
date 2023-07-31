import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import AuthContext from '../../context/auth-context';
import SearchBar from './SearchBar';

import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = event => {
    event.stopPropagation();
    setShowSearchBar(!showSearchBar);
  };

  const closeSearchBar = () => {
    setShowSearchBar(false);
  };

  const closeSearchHandler = event => {
    event.preventDefault();
    setShowSearchBar(false);
  };

  return (
    <ul className='nav-links'>
      {showSearchBar ? (
        <SearchBar onCloseSearch={closeSearchBar} />
      ) : (
        <>
          <li>
            <NavLink to='/search' onClick={toggleSearchBar}>
              <BsSearch />
            </NavLink>
          </li>
          <li>
            <NavLink to='/leagues'>ALL LEAGUES</NavLink>
          </li>
          {!auth.isLoggedIn && (
            <li>
              <NavLink to='/login'>LOGIN</NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <NavLink to='/' onClick={auth.logout}>
                LOGOUT
              </NavLink>
            </li>
          )}
        </>
      )}
    </ul>
  );
};

export default NavLinks;
