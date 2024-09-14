import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/LeagueDetail.css';
import { fetchFutureMatches, fetchPastMatches, fetchLeague, fetchLeagueStandings } from '../util/http';
import { useFetch } from '../hooks/useFetch';
import LeagueTable from '../components/StandingTable/LeagueTable';
import MatchesList from '../components/MatchesList';

const LeagueDetail = () => {
  const [standings, setStandings] = useState([]);
  const [selectedTab, setSelectedTab] = useState('table');
  const params = useParams();
  const leagueId = params.leagueId;

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
  //   isLoading: isLoadingSchedule,
  //   error: scheduleError,
  //   fetchedData: schedule,
  // } = useFetch(fetchFutureMatches, []);

  // const { isLoading: isLoadingResults, error: resultsError, fetchedData: results } = useFetch(fetchPastMatches, []);

  // Use the `fetchLeague` directly as `fetchFn` without wrapping it in an inline function
const { isLoading: isLoadingLeague, error: leagueError, fetchedData: league } = useFetch(() => fetchLeague(leagueId), [leagueId]);

const { isLoading: isLoadingSchedule, error: scheduleError, fetchedData: schedule } = useFetch(fetchFutureMatches, []);

const { isLoading: isLoadingResults, error: resultsError, fetchedData: results } = useFetch(fetchPastMatches, []);


  const renderContent = () => {
    switch (selectedTab) {
      case 'table':
        return <LeagueTable standings={standings} />;
      case 'schedule':
        return (
          <div className='league-schedule'>
            <h3>Schedule</h3>
            <MatchesList matches={schedule} type='schedule' />
          </div>
        );
      case 'results':
        return (
          <div className='league-results'>
            <h3>Results</h3>
            <MatchesList matches={results} type='results' />
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
            Season: 2024/2025
            {/* Season: {new Date(league.currentSeason.startDate).getFullYear()}/
            {new Date(league.currentSeason.endDate).getFullYear()} */}
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
