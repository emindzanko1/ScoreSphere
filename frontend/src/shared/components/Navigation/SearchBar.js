import React from 'react';

import './SearchBar.css'

const SearchBar = props => {
  const handleSearchInputChange = event => {
    //const searchText = event.target.value;
  };

  return (
    <form className='search-form'>
      <input
        type='text'
        placeholder='Search'
        onChange={handleSearchInputChange}
      />
      <button type='button' onClick={props.onCloseSearch}>
        Close
      </button>
    </form>
  );
};

export default SearchBar;

