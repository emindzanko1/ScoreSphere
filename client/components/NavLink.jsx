import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { MdOutlineSearchOff } from 'react-icons/md';
import { FaUserLarge } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
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
        <NavLink to='/auth' className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaUserLarge />
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
