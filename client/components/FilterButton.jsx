import React, { useState, useEffect, useCallback } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatDate } from '../util/helpers';

import '../styles/FilterButton.css';
import CalendarDropdown from './CalendarDropdown';
import { useFetch } from '../hooks/useFetch';
import {
  fetchCurrentMatches,
  fetchFutureTodayMatches,
  fetchInProgressTodayMatches,
  fetchPastTodayMatches,
} from '../util/http';

const FilterButton = ({ setMatches }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const fetchFn = useCallback(() => {
  //   switch (activeButton) {
  //     case 0:
  //       return fetchCurrentMatches;
  //     case 1:
  //       return fetchInProgressTodayMatches;
  //     case 2:
  //       return fetchPastTodayMatches;
  //     case 3:
  //       return fetchFutureTodayMatches;
  //     default:
  //       return null;
  //   }
  // }, [activeButton]);

  // // Use the custom useFetch hook
  // const { isLoading, fetchedData, error } = useFetch(fetchFn(), [activeButton]);

  // // Set matches when fetchedData changes
  // useEffect(() => {
  //   if (fetchedData) {
  //     setMatches(fetchedData);
  //   }
  // }, [fetchedData, setMatches]);

  useEffect(() => {
    const fetchMatches = async endpoint => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMatches(data.matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    switch (activeButton) {
      case 0:
        fetchMatches('http://localhost:8080/leagues/currentMatches');
        break;
      case 1:
        fetchMatches('http://localhost:8080/leagues/inProgressTodayMatches');
        break;
      case 2:
        fetchMatches('http://localhost:8080/leagues/pastTodayMatches');
        break;
      case 3:
        fetchMatches('http://localhost:8080/leagues/futureTodayMatches');
        break;
      default:
        break;
    }
  }, [activeButton]);

  const handleButtonClick = index => {
    setActiveButton(index);
  };

  return (
    <div className='main-controls'>
      {['All', 'Live', 'Done', 'Schedule'].map((label, index) => (
        <button
          key={index}
          className={activeButton === index ? 'active-button' : 'button'}
          onClick={() => handleButtonClick(index)}
        >
          {label}
        </button>
      ))}
      <div className='calendar__datepicker'>
        <button
          className='calendar__navigation--yesterday'
          title='The previous day'
          onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
        >
          &lt;
        </button>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='calendar__dropdown'>
          <FaRegCalendarAlt />
          <span>{formatDate(currentDate)}</span>
          {isDropdownOpen && (
            <CalendarDropdown
              date={currentDate}
              setDate={setCurrentDate}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
        </button>
        <button
          className='calendar__navigation--tommorow'
          title='The next day'
          onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
