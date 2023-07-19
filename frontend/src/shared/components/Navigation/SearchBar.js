import React, { useState } from 'react';

import './SearchBar.css'

const SearchBar = props => {
  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    console.log('Searching for:', searchText);
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


/*import React from 'react';

import './SearchBar.css';

const SearchBar = props => {
  return (
    <form onSubmit={props.closeSearchHandler}>
      <input type='search' placeholder='Search' className='search-bar'/>
      <button onClick={props.closeSearchHandler}/>
    </form>
  );
};

export default SearchBar;*/



  //ne trebam ovo, treba mi se odmah prikazivati tekst, nista se ne submita.
 /* const handleSearchSubmitHandler = event => {
    event.preventDefault();
    console.log('Searching...');
  };*/

  // ovako bi trebala izgledati komponenta sa idejom bez submita
  /*import React from 'react';

const SearchBar = props => {
  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    // Perform search logic here and update the search results
    console.log('Searching for:', searchText);
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
*/