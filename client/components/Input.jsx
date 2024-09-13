import React, { useEffect, useRef, useState } from 'react';
import '../styles/Input.css';

const Input = () => {
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState('all');
  const [pinnedLeagues, setPinnedLeagues] = useState([
    {
      id: 1,
      name: 'Premier League',
      flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png',
    },
    {
      id: 2,
      name: 'La Liga',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/360px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png',
    },
  ]);
  const [pinnedClubs, setPinnedClubs] = useState([
    {
      id: 3,
      name: 'Manchester City',
      flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png',
    },
    { id: 4, name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  ]);

  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  const mergedPinnedItems = [
    ...pinnedLeagues.map(item => ({ ...item, type: 'league' })),
    ...pinnedClubs.map(item => ({ ...item, type: 'club' })),
  ];
  const [filteredItems, setFilteredItems] = useState(mergedPinnedItems);

  const handleSearch = event => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);

    const filteredBySearch = mergedPinnedItems.filter(item => item.name.toLowerCase().includes(text));

    const results = filteredBySearch.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'league') return item.type === 'league';
      if (filter === 'team') return item.type === 'club';
      return true;
    });

    setFilteredItems(results);
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredItems(mergedPinnedItems);
    searchInputRef.current.focus();
  };

  const handleClickOutside = event => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
      setSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = newFilter => {
    setFilter(newFilter);

    const filteredBySearch = mergedPinnedItems.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const results = filteredBySearch.filter(item => {
      if (newFilter === 'all') return true;
      if (newFilter === 'league') return item.type === 'league';
      if (newFilter === 'team') return item.type === 'club';
      return true;
    });

    setFilteredItems(results);
  };

  return (
    <div className='search-wrapper' ref={searchWrapperRef}>
      <input
        type='text'
        className='search-input'
        placeholder='Search leagues or teams...'
        onFocus={() => setSearch(true)}
        value={searchText}
        onChange={handleSearch}
        ref={searchInputRef}
      />
      {searchText && (
        <button type='button' className='clear-button' onClick={handleClear}>
          &times;
        </button>
      )}
      {search && (
        <div className='search-overlay'>
          <div className='filter-buttons'>
            <button onClick={() => handleFilterChange('all')} className={filter === 'all' ? 'active' : ''}>
              All
            </button>
            <button onClick={() => handleFilterChange('league')} className={filter === 'league' ? 'active' : ''}>
              League
            </button>
            <button onClick={() => handleFilterChange('team')} className={filter === 'team' ? 'active' : ''}>
              Team
            </button>
          </div>
          <ul className='search-results'>
            {filteredItems.map(item => (
              <li key={item.id} className='search-result-item'>
                <img src={item.flag} alt={`${item.name} flag`} className='search-result-flag' />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
