import React, { useState } from 'react';
import NavLinks from './NavLink';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Input from './Input';

const Header = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleToggleSearch = () => {
    setShowSearchInput(prev => !prev);
  };

  return (
    <header>
      <div className='title'>
        <Link to='/'>ScoreSphere</Link>
      </div>
      {showSearchInput && <Input />}
      <NavLinks onToggleSearch={handleToggleSearch} showSearchInput={showSearchInput} />
    </header>
  );
};

export default Header;
