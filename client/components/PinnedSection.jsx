import { useEffect, useState } from 'react';
import { MdPushPin } from 'react-icons/md';

import '../styles/PinnedSection.css';
import { Link } from 'react-router-dom';

export default function PinnedSection() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/leagues/all-leagues');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLeagues(data.leagues);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchLeagues();
  }, []);

  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/leagues/all-teams');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTeams(data.teams);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchTeams();
  }, []);

  const handlePinClick = (e, id, type) => {
    e.stopPropagation(); 
    if (type === 'league') {
      setLeagues(leagues.filter(league => league.id !== id));
    } else if (type === 'team') {
      setTeams(teams.filter(team => team.id !== id));
    }
  };

  return (
    <aside>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <div className='pinned-section'>
            <h2>Pinned Leagues</h2>
            {leagues.map(league => (
              <Link to={`/league/${league.id}`} key={league.id} className='pinned-item'>
                <img src={league.emblem} alt={`${league.name} flag`} />
                <div className='name'>{league.name}</div>
                <div className='unpin-tooltip'>
                  <span className='tooltiptext'>Remove this league from your Pinned Leagues!</span>
                  <MdPushPin className='unpin-icon' onClick={e => handlePinClick(e, league.id, 'league')} />
                </div>
              </Link>
            ))}
          </div>
          <div className='pinned-section'>
            <h2>Pinned Teams</h2>
            {teams.map(team => (
              <Link to={`/team/${team.id}`} key={team.id} className='pinned-item'>
                <img src={team.crest} alt={`${team.name} flag`} />
                <div className='name'>{team.name}</div>
                <div className='unpin-tooltip'>
                  <span className='tooltiptext'>Remove this team from your Pinned Teams!</span>
                  <MdPushPin className='unpin-icon' onClick={e => handlePinClick(e, team.id, 'team')} />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
