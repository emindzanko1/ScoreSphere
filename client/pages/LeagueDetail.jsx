import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatMatchDate } from '../util/helpers';
import '../styles/LeagueDetail.css';
import { fetchFutureMatches, fetchPastMatches, fetchLeague, fetchLeagueStandings } from '../util/http';
import { useFetch } from '../hooks/useFetch';
import LeagueTable from '../components/StandingTable/LeagueTable';

const renderMatchesWithHeaders = (matches, type) => {
  let lastMatchday = null;

  return matches.map((match, index) => {
    const isNewMatchday = match.matchday !== lastMatchday;
    lastMatchday = match.matchday;

    return (
      <React.Fragment key={index}>
        {isNewMatchday && (
          <li className='matchday-header'>
            <h4>Matchday {match.matchday}</h4>
          </li>
        )}
        {type === 'schedule' ? (
          <li>
            {formatMatchDate(match.utcDate)} {match.homeTeam.name} - : - {match.awayTeam.name}
          </li>
        ) : (
          <li>
            {formatMatchDate(match.utcDate)} {match.homeTeam.name} {match.score.fullTime.home} -{' '}
            {match.score.fullTime.away} {match.awayTeam.name}
          </li>
        )}
      </React.Fragment>
    );
  });
};

const LeagueDetail = () => {
  const [league, setLeague] = useState(null);
  const [standings, setStandings] = useState([]);
  const [selectedTab, setSelectedTab] = useState('table');
  const params = useParams();
  const leagueId = params.leagueId;

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        const league = await fetchLeague(leagueId);
        setLeague(league);
      } catch (error) {
        console.error('Error fetching league details:', error);
      }
    };
    fetchLeagueDetails();
  }, [leagueId]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const standing = await fetchLeagueStandings(leagueId);
        setStandings(standing);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };
    fetchStandings();
  }, [leagueId]);

  // const {
  //   isLoading: isLoadingLeague,
  //   error: leagueError,
  //   fetchedData: league,
  // } = useFetch(() => fetchLeague(leagueId), [leagueId]);
  // const {
  //   isLoading: isLoadingStanding,
  //   error: standingError,
  //   fetchedData: standings,
  // } = useFetch(() => fetchLeagueStandings(leagueId), [leagueId]);
  const {
    isLoading: isLoadingSchedule,
    error: scheduleError,
    fetchedData: schedule,
  } = useFetch(fetchFutureMatches, []);
  const { isLoading: isLoadingResults, error: resultsError, fetchedData: results } = useFetch(fetchPastMatches, []);

  const renderContent = () => {
    switch (selectedTab) {
      case 'table':
        return <LeagueTable standings={standings} />;
      // return (
      //   <div className='league-table'>
      //     <h3>Standings</h3>
      //     <table>
      //       <thead>
      //         <tr>
      //           <th>#</th>
      //           <th>Team</th>
      //           <th>Played</th>
      //           <th>W</th>
      //           <th>D</th>
      //           <th>L</th>
      //           <th>GF</th>
      //           <th>GA</th>
      //           <th>GD</th>
      //           <th>Points</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {standings.map(team => (
      //           <tr key={team.team.id}>
      //             <td>{team.position}</td>
      //             <td className='team-info'>
      //               <img src={team.team.crest} alt={`${team.team.name} crest`} className='team-crest' />
      //               {team.team.name}
      //             </td>
      //             <td>{team.playedGames}</td>
      //             <td>{team.won}</td>
      //             <td>{team.draw}</td>
      //             <td>{team.lost}</td>
      //             <td>{team.goalsFor}</td>
      //             <td>{team.goalsAgainst}</td>
      //             <td>{team.goalDifference}</td>
      //             <td>{team.points}</td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </table>
      //   </div>
      // );
      case 'schedule':
        return (
          <div className='league-schedule'>
            <h3>Schedule</h3>
            <ul>
              {renderMatchesWithHeaders(schedule, 'schedule')}
              {/* {schedule.map((match, index) => (
                <li key={index}>
                  {formatMatchDate(match.utcDate)} {match.homeTeam.name} {match.score.fullTime.home} -{' '}
                  {match.score.fullTime.away} {match.awayTeam.name}
                </li>
              ))} */}
            </ul>
          </div>
        );
      case 'results':
        return (
          <div className='league-results'>
            <h3>Results</h3>
            <ul>
              {renderMatchesWithHeaders(results, 'results')}
              {/* {results.map((match, index) => (
                <li key={index}>
                  {formatMatchDate(match.utcDate)} {match.homeTeam.name} - : - {match.awayTeam.name}
                </li>
              ))} */}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  if (!league) {
    return <p>Loading...</p>;
  }

  return (
    <div className='league-details'>
      <header className='league-header'>
        <img src={league.emblem} alt={`${league.name} logo`} />
        <div>
          <h2>{league.name}</h2>
          <p>
            Season: {new Date(league.currentSeason.startDate).getFullYear()}/
            {new Date(league.currentSeason.endDate).getFullYear()}
          </p>
        </div>
      </header>

      <nav className='league-nav'>
        <button className={selectedTab === 'table' ? 'active' : ''} onClick={() => setSelectedTab('table')}>
          Table
        </button>
        <button className={selectedTab === 'schedule' ? 'active' : ''} onClick={() => setSelectedTab('schedule')}>
          Schedule
        </button>
        <button className={selectedTab === 'results' ? 'active' : ''} onClick={() => setSelectedTab('results')}>
          Results
        </button>
      </nav>

      <section className='league-content'>{renderContent()}</section>
    </div>
  );
};

export default LeagueDetail;
