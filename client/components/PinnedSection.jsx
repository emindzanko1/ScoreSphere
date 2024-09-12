import { useEffect, useState } from 'react';
import PinnedItem from './PinnedItem';

import '../styles/PinnedSection.css';

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
              <PinnedItem
                key={league.id}
                id={league.id}
                name={league.name}
                emblem={league.emblem}
                type='league'
                onUnpin={handlePinClick}
                link={`/league/${league.id}`}
              />
            ))}
          </div>
          <div className='pinned-section'>
            <h2>Pinned Teams</h2>
            {teams.map(team => (
              <PinnedItem
                key={team.id}
                id={team.id}
                name={team.name}
                emblem={team.crest}
                type='team'
                onUnpin={handlePinClick}
                link={`/team/${team.id}`}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
