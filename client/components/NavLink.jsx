import '../styles/NavLink.css'

export default function NavLink() {
  return (
    <nav className='nav-links'>
      <a href='/search'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-search'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
          <path d='M21 21l-6 -6' />
        </svg>
      </a>
      <a href='/auth'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='icon icon-tabler icons-tabler-filled icon-tabler-user'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
          <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
        </svg>
      </a>
      <a href='/dark'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-moon'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
        </svg>
      </a>
    </nav>
  );
}
