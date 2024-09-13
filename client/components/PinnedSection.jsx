import React, { useEffect, useState } from 'react';
import PinnedItem from './PinnedItem';

import '../styles/PinnedSection.css';
import { fetchAllLeagues, fetchAllTeams } from '../util/http';
import { useFetch } from '../hooks/useFetch';

const PinnedSection = () => {
  const { isLoading: isLoadingLeagues, error: leaguesError, fetchedData: leagues, setFetchedData: setLeagues } = useFetch(fetchAllLeagues, []);
  const { isLoading, isLoadingTeams, error: teamsError, fetchedData: teams, setFetchedData: setTeams } = useFetch(fetchAllTeams, []);
  
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
      {isLoadingLeagues && <p>Loading...</p>}
      {!isLoadingLeagues && (
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
};

export default PinnedSection;
