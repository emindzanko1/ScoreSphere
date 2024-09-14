import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { MdSearch, MdOutlineSearchOff, MdLogout } from 'react-icons/md';
import { FaRegUser, FaUser } from 'react-icons/fa';
import '../styles/NavLink.css';
import ThemeSwitch from './ThemeSwitch';

const NavLinks = ({ onToggleSearch, showSearchInput }) => {
  const token = useRouteLoaderData('root');

  return (
    <nav className='nav-links'>
      <button onClick={onToggleSearch} className='search-button'>
        {showSearchInput ? <MdOutlineSearchOff /> : <MdSearch />}
      </button>

      {!token && (
        <NavLink to='/auth'>
          {({ isActive }) => (isActive ? <FaUser /> : <FaRegUser />)}
        </NavLink>
      )}

      {token && (
        <Form action='/logout' method='post'>
          <button>
            <MdLogout />
          </button>
        </Form>
      )}

      <div className='theme-switch-wrapper'>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default NavLinks;
