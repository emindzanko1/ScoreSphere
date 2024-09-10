import '../styles/SportLink.css';
import { NavLink } from 'react-router-dom';

export default function SportLink() {
  return (
    <div className='sports-links'>
      <NavLink to='favorites'>
        Favorites
      </NavLink>
      <NavLink to='football'>
        Football
      </NavLink>
    </div>
  );
}
