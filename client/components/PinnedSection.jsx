import { useState } from 'react';
import { MdPushPin } from 'react-icons/md';

import '../styles/PinnedSection.css';
import { Link } from 'react-router-dom';

export default function PinnedSection() {
  const [pinnedLeagues, setPinnedLeagues] = useState([
    {
      id: 1,
      name: 'Premier League',
      flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png',
    },
    {
      id: 2,
      name: 'La Liga',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/360px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png',
    },
  ]);

  const [pinnedClubs, setPinnedClubs] = useState([
    {
      id: 1,
      name: 'Manchester City',
      flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png',
    },
    { id: 2, name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  ]);

  const handlePinClick = (e, id, type) => {
    e.stopPropagation(); // Prevent the Link's onClick from firing
    if (type === 'league') {
      setPinnedLeagues(pinnedLeagues.filter(league => league.id !== id));
    } else if (type === 'club') {
      setPinnedClubs(pinnedClubs.filter(club => club.id !== id));
    }
  };

  return (
    <aside>
      <div className='pinned-section'>
        <h2>Pinned Leagues</h2>
        {pinnedLeagues.map(league => (
          <Link to={`/league/${league.id}`} key={league.id} className='pinned-item'>
            <img src={league.flag} alt={`${league.name} flag`} />
            <div className='name'>{league.name}</div>
            <div className='unpin-tooltip'>
              <span className='tooltiptext'>Remove this league from your Pinned Leagues!</span>
              <MdPushPin className='unpin-icon' onClick={e => handlePinClick(e, league.id, 'league')} />
            </div>
          </Link>
        ))}
      </div>
      <div className='pinned-section'>
        <h2>Pinned Clubs</h2>
        {pinnedClubs.map(club => (
          <Link to={`/club/${club.id}`} key={club.id} className='pinned-item'>
            <img src={club.flag} alt={`${club.name} flag`} />
            <div className='name'>{club.name}</div>
            <div className='unpin-tooltip'>
              <span className='tooltiptext'>Remove this club from your Pinned Clubs!</span>
              <MdPushPin className='unpin-icon' onClick={e => handlePinClick(e, club.id, 'club')} />
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
