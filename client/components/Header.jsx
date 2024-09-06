import NavLink from './NavLink';
import '../styles/Header.css';

export default function Header() {
  return (
    <>
      <header>
        <div className='title'>
          <a href='/'>ScoreSphere</a>
        </div>
        <NavLink />
      </header>
    </>
  );
}
