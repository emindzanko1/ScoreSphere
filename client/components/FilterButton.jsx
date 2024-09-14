import React, { useState, useEffect } from 'react';
import '../styles/FilterButton.css';
import CalendarDropdown from './CalendarDropdown';

const FilterButton = ({ setMatches }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchMatches = async endpoint => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMatches(data.matches);
        console.log(data.matches);
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
        <CalendarDropdown date={currentDate} setDate={setCurrentDate} />
        <button
          className='calendar__navigation--tomorrow'
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
