import React, { useState } from 'react';
import '../../styles/ResultTable.css';
import MatchModal from '../MatchModal';
import TableBody from './ResultTableBody';
import { fetchCurrentMatches } from '../../util/http';
import { useFetch } from '../../hooks/useFetch';
import TableHead from './ResultTableHead';
import TableInfo from './ResultTableInfo';

const ResultTable = () => {
  const [allStarsActive, setAllStarsActive] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMainStarClick = () => {
    setAllStarsActive(!allStarsActive);
    if (allStarsActive) {
      setFavourites([]);
    } else {
      const allIndices = Array.from({ length: 10 }, (_, i) => i);
      setFavourites(allIndices);
    }
  };

  const handleFavorite = index => {
    if (favourites.includes(index)) {
      setFavourites(favourites.filter(favIndex => favIndex !== index));
    } else {
      setFavourites([...favourites, index]);
    }
  };

  const handleRowClick = matchData => {
    setSelectedMatch(matchData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading: isLoadingMatches, error: matchesError, fetchedData: matches } = useFetch(fetchCurrentMatches, []);

  if (matches) {
    const leagues = matches.reduce((acc, match) => {
      const leagueName = match.competition.name;
      if (!acc[leagueName]) {
        acc[leagueName] = [];
      }
      acc[leagueName].push(match);
      return acc;
    }, {});

    return (
      <div className='table-container'>
        <MatchModal isOpen={isModalOpen} matchData={selectedMatch} onClose={closeModal} />
        {Object.entries(leagues).map(([leagueName, leagueMatches]) => (
          <div key={leagueName} className='league-section'>
            <div className='league-info'>
              <TableInfo
                leagueName={leagueName}
                leagueEmblem={leagueMatches[0].competition.emblem}
                areaName={leagueMatches[0].area.name}
                allStarsActive={allStarsActive}
                handleMainStarClick={handleMainStarClick}
              />
            </div>
            <table className='styled-table'>
              <TableHead />
              <TableBody
                matches={leagueMatches}
                favourites={favourites}
                handleFavorite={handleFavorite}
                handleRowClick={handleRowClick}
              />
            </table>
          </div>
        ))}
      </div>
    );
  }

  return <p>Loading matches...</p>;
};

export default ResultTable;
