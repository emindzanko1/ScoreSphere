import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../../images/search-icon.png';

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
    console.log("Kliknuo");
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchSubmitHandler = event => {
    event.preventDefault();
    // Perform search logic here
    console.log('Searching...');
  };

  return (
    <ul className='nav-links'>
      {
        //auth.isLoggedIn &&click && 
        (
          <li>
            <NavLink to='/'>All LEAGUES</NavLink>
          </li>
        )
      }
      <li>
      {/*provjeriti bolje ovaj search napraviti komponentu search*/}
      <NavLink to="/" exact className="search-link" onClick={toggleSearchBar}>
        <img src={Search} alt="Search" className="nav-link-icon" />
      </NavLink>
      {showSearchBar && (
        <div className="search-bar">
         {<form onSubmit={handleSearchSubmitHandler} className="search-form">
            <input type="text" placeholder="Search" />
            <button type="submit" onClick={closeSearchHandler}>Close</button>
          </form>}
        </div>
      )}
    </li>
      {
        //auth.isLoggedIn && ni prijava ni registracija nemaju svoju rutu vec ce iskakati.

        <li>
          <NavLink to='/login'>LOGIN</NavLink>
        </li>
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
