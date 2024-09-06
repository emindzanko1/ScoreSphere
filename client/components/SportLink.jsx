import { useState } from 'react';
import '../styles/SportLink.css';

export default function SportLink() {
  const [activeLink, setActiveLink] = useState('football');

  const handleActive = index => {
    setActiveLink(index);
  };

  return (
    <div className='sports-links'>
      <a className={activeLink === 'basketball' ? 'active' : ''} onClick={() => handleActive('basketball')}>
        Favorites
      </a>
      <a className={activeLink === 'football' ? 'active' : ''} onClick={() => handleActive('football')}>
        Football
      </a>
    </div>
  );
}
