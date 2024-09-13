import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatDate, getLastAndNext7Days } from '../util/helper';
import '../styles/CalendarDropdown.css';

const CalendarDropdown = ({ date, setDate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dates = getLastAndNext7Days(date);

  const handleDateClick = selectedDate => {
    setDate(selectedDate);
    setIsDropdownOpen(false);
  };

  return (
    <div className='calendar__dropdown'>
      <FaRegCalendarAlt onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
      <span>{formatDate(date)}</span>
      {isDropdownOpen && (
        <ul className='calendar__dropdown-menu'>
          {dates.map((dateObj, index) => (
            <li key={index} onClick={() => handleDateClick(dateObj.date)}>
              {dateObj.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarDropdown;
