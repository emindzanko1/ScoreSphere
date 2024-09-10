import React, { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import '../styles/ResultTable.css';

const ResultTable = () => {
  const [allStarsActive, setAllStarsActive] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const handleMainStarClick = () => {
    setAllStarsActive(!allStarsActive);
    if (allStarsActive) {
      setFavourites([]);
    } else {
      const allIndices = Array.from({ length: 10 }, (_, i) => i);
      setFavourites(allIndices);
    }
  };

  const handleFavorite = index => {
    if (favourites.includes(index)) {
      setFavourites(favourites.filter(favIndex => favIndex !== index));
    } else {
      setFavourites([...favourites, index]);
    }
  };

  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <tr key={i}>
          <td>
            <button onClick={() => handleFavorite(i)} className='star-btn'>
              {favourites.includes(i) ? <FaStar /> : <CiStar />}
            </button>
          </td>
          <td>{Math.floor(Math.random() * 90) + 1}&apos;</td>
          <td>
            <img
              src='https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'
              alt='Club 1 Badge'
              className='badge'
            />
          </td>
          <td>Manchester City</td>
          <td className='result'>
            {Math.floor(Math.random() * 5)} - {Math.floor(Math.random() * 5)}
          </td>
          <td>Barcelona</td>
          <td>
            <img
              src='https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg'
              alt='Club 2 Badge'
              className='badge'
            />
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className='table-container'>
      <div className='league-info'>
        <button onClick={handleMainStarClick} className='star-btn'>
          {allStarsActive ? <FaStar /> : <CiStar />}
        </button>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png'
          alt='League 1 Badge'
          className='league_badge'
        />
        <div className='club-text'>
          <span className='text1'>La Liga</span>
          <span className='text2'>Spain</span>
        </div>
      </div>
      <table className='styled-table'>
        <thead className='table-head'>
          <tr>{/* <th><button className="star-btn"><CiStar /></button></th> */}</tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <thead className='table-head'>
          <tr>
            <div className='club-info'>
              <img
                src='https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'
                alt='Club 1 Badge'
                className='league_badge'
              />
              <div className='club-text'>
                <span className='text1'>Text 1</span>
                <span className='text2'>Text 2</span>
              </div>
            </div>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <tbody>{generateRows()}</tbody>
      </table>
      <table className='styled-table'>
        <tbody>{generateRows()}</tbody>
      </table>
    </div>
  );
};

export default ResultTable;
