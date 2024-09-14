import React from 'react';
import { getLastAndNext7Days, areDatesEqual } from '../util/helpers';
import '../styles/CalendarDropdown.css';

const dates = getLastAndNext7Days(new Date());

const CalendarDropdown = ({ date, setDate, setIsDropdownOpen }) => {
  const handleDateClick = selectedDate => {
    setDate(selectedDate);
    setIsDropdownOpen(false);
  };

  return (
    <ul className='calendar__dropdown-menu'>
      {dates.map((dateObj, index) => (
        <li
          key={index}
          onClick={() => handleDateClick(dateObj.date)}
          className={areDatesEqual(date, dateObj.label) ? 'today-item' : ''}
        >
          {dateObj.label}
        </li>
      ))}
    </ul>
  );
};

export default CalendarDropdown;
