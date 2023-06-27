import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import './NavLinks.css';

const NavLinks = props => {
  //const auth = useContext(AuthContext);

  const [click, isClicked] = useState(false);

  const clickHandler = () => {
    //isClicked(prevClick => !prevClick);
  };

  const [showSearchBar, setShowSearchBar] = useState(false);

  const closeSearchHandler = () => {
    setShowSearchBar(false);
  };

  const toggleSearchBar = event => {
    event.stopPropagation();
    console.log('Kliknuo');
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchSubmitHandler = event => {
    event.preventDefault();
    // Perform search logic here
    console.log('Searching...');
  };

  return (
    <ul className='nav-links'>
      {!showSearchBar && (
        <>
          <li>
            <NavLink to='/'>ALL LEAGUES</NavLink>
          </li>
          <li>
            <NavLink to='/login'>LOGIN</NavLink>
          </li>
          <li>
            <NavLink to='/search' exact className='search-link' onClick={toggleSearchBar}>
              <BsSearch className='nav-link-icon black-icon' />
            </NavLink>
          </li>
        </>
      )}
      {showSearchBar && (
        <li>
          <div className='search-bar'>
            <form onSubmit={handleSearchSubmitHandler} className='search-form'>
              <input type='text' placeholder='Search' />
              <button type='submit' onClick={closeSearchHandler}>
                Close
              </button>
            </form>
          </div>
        </li>
      )}
      {
        //auth.isLoggedIn &&click &&
      }
      <li>
        {/*provjeriti bolje ovaj search napraviti komponentu search*/}
        {/*showSearchBar && (
        <div className="search-bar">
         {<form onSubmit={handleSearchSubmitHandler} className="search-form">
            <input type="text" placeholder="Search" />
            <button type="submit" onClick={closeSearchHandler}>Close</button>
          </form>}
        </div>
      )*/}
      </li>
      {
        //auth.isLoggedIn && ni prijava ni registracija nemaju svoju rutu vec ce iskakati.
      }
      {
        //auth.isLoggedIn && onClick={auth.logout}
        click && (
          <li>
            <button>LOGOUT</button>
          </li>
        )
      }
    </ul>
  );
};

export default NavLinks;
