export async function fetchAllLeagues() {
  const response = await fetch('http://localhost:8080/leagues/all-leagues');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.leagues;
}

export async function fetchAllTeams() {
  const response = await fetch('http://localhost:8080/leagues/all-teams');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.teams;
}

export async function fetchLeague(leagueId) {
  const response = await fetch(`http://localhost:8080/leagues/${leagueId}`);
  
  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.league;
}

export async function fetchLeagueStandings(leagueId) {
  const response = await fetch(`http://localhost:8080/leagues/${leagueId}/standings`);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.standing[0].table;
}

export async function fetchCurrentMatches() {
  const response = await fetch('http://localhost:8080/leagues/currentMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}


export async function fetchFutureMatches() {
  const response = await fetch('http://localhost:8080/leagues/futureMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}

export async function fetchPastMatches() {
  const response = await fetch('http://localhost:8080/leagues/pastMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}

export async function fetchInProgressTodayMatches() {
  const response = await fetch('http://localhost:8080/leagues/inProgressTodayMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}

export async function fetchPastTodayMatches() {
  const response = await fetch('http://localhost:8080/leagues/pastTodayMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}

export async function fetchFutureTodayMatches() {
  const response = await fetch('http://localhost:8080/leagues/futureTodayMatches');

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.matches;
}


