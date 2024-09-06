import '../styles/Header.css'
import NavLink from './NavLink';

export default function Header() {
  return (
    <header>
      <div className='title'>
        <a href='/'>ScoreSphere</a>
      </div>
      <NavLink />
    </header>
  );
}

   