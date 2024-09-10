import NavLinks from './NavLink';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header>
        <div className='title'>
          <Link to='/'>ScoreSphere</Link>
        </div>
        <NavLinks />
      </header>
    </>
  );
}
