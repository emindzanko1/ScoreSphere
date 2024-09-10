import { useState } from 'react';
import '../styles/FilterButton.css';
import CalendarDropdown from './CalendarDropdown';

export default function FilterButton() {
  const [activeButton, setActiveButton] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

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
          {/* <MdKeyboardArrowLeft /> */}
        </button>
        <CalendarDropdown date={currentDate} setDate={setCurrentDate} />
        <button
          className='calendar__navigation--tomorrow'
          title='The next day'
          onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
        >
          &gt;
          {/* <MdKeyboardArrowRight /> */}
        </button>
      </div>
    </div>
  );
}
