import { readFile, writeFile } from 'node:fs/promises';

async function readData() {
  const data = await readFile('events.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await writeFile('events.json', JSON.stringify(data));
}

async function readLeagueData() {
  const data = await readFile('leagues.json', 'utf8');
  return JSON.parse(data);
}

async function readTeamData() {
  const data = await readFile('teams.json', 'utf8');
  return JSON.parse(data);
}

async function readStandingData() {
  const data = await readFile('standings.json', 'utf8');
  return JSON.parse(data);
}

// bit ce vjv svaka liga svoje meceve za potrebe testiranja mijenjam kode
// async function readCurrentMatchesData() {
//   const fileData = await readFile('matches.json', 'utf8');
//   const data = JSON.parse(fileData);
//   const today = new Date();
//   const currentMatches = data.matches[0].matches.filter(match => {
//     const matchDate = new Date(match.utcDate);
//     return matchDate.toDateString() === today.toDateString();
//   });
//   return currentMatches;
// }

async function readCurrentMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);

  const today = new Date().toDateString();

  const currentMatches = [];

  for (const matchObject of data.matches) {
    const matchesForToday = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate.toDateString() === today;
    });

    currentMatches.push(...matchesForToday);
  }

  return currentMatches;
}

async function readFutureMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();

  const futureMatches = [];

  for (const matchObject of data.matches) {
    const matchesForFuture = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate >= today;
    });

    futureMatches.push(...matchesForFuture);
  }

  return futureMatches;
}


async function readPastMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();

  const pastMatches = [];

  for (const matchObject of data.matches) {
    const matchesForPast = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate < today;
    });

    pastMatches.push(...matchesForPast);
  }

  // Sort by matchday in descending order
  pastMatches.sort((a, b) => b.matchday - a.matchday);
  return pastMatches;
}


async function readPastTodayMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();

  const pastTodayMatches = [];

  for (const matchObject of data.matches) {
    const matchesForPastToday = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);

      const isToday =
        matchDate.getUTCFullYear() === today.getUTCFullYear() &&
        matchDate.getUTCMonth() === today.getUTCMonth() &&
        matchDate.getUTCDate() === today.getUTCDate();

      return isToday && match.status === 'FINISHED';
    });

    pastTodayMatches.push(...matchesForPastToday);
  }

  return pastTodayMatches;
}


async function readFutureTodayMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();

  const futureTodayMatches = [];

  for (const matchObject of data.matches) {
    const matchesForFutureToday = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);

      const isToday =
        matchDate.getUTCFullYear() === today.getUTCFullYear() &&
        matchDate.getUTCMonth() === today.getUTCMonth() &&
        matchDate.getUTCDate() === today.getUTCDate();

      return isToday && match.status === 'TIMED';
    });

    futureTodayMatches.push(...matchesForFutureToday);
  }

  return futureTodayMatches;
}


async function readInProgressTodayMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();

  const inProgressTodayMatches = [];

  for (const matchObject of data.matches) {
    const matchesForInProgressToday = matchObject.matches.filter(match => {
      const matchDate = new Date(match.utcDate);

      const isToday =
        matchDate.getUTCFullYear() === today.getUTCFullYear() &&
        matchDate.getUTCMonth() === today.getUTCMonth() &&
        matchDate.getUTCDate() === today.getUTCDate();

      return isToday && (match.status === 'IN_PLAY' || match.status === 'LIVE');
    });

    inProgressTodayMatches.push(...matchesForInProgressToday);
  }

  return inProgressTodayMatches;
}


const _readData = readData;
export { _readData as readData };
const _writeData = writeData;
export { _writeData as writeData };
const _readLeagueData = readLeagueData;
export { _readLeagueData as readLeagueData };
const _readTeamData = readTeamData;
export { _readTeamData as readTeamData };
const _readStandingData = readStandingData;
export { _readStandingData as readStandingData };
const _readCurrentMatchesData = readCurrentMatchesData;
export { _readCurrentMatchesData as readCurrentMatchesData };
const _readFutureMatchesData = readFutureMatchesData;
export { _readFutureMatchesData as readFutureMatchesData };
const _readPastMatchesData = readPastMatchesData;
export { _readPastMatchesData as readPastMatchesData };
const _readPastTodayMatchesData = readPastTodayMatchesData;
export { _readPastTodayMatchesData as readPastTodayMatchesData };
const _readFutureTodayMatchesData = readFutureTodayMatchesData;
export { _readFutureTodayMatchesData as readFutureTodayMatchesData };
const _readInProgressTodayMatchesData = readInProgressTodayMatchesData;
export { _readInProgressTodayMatchesData as readInProgressTodayMatchesData };