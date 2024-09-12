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

async function readFutureMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();
  const futureMatches = data.matches[0].matches.filter(match => {
    const matchDate = new Date(match.utcDate);
    return matchDate >= today;
  });
  return futureMatches;
}

async function readPastMatchesData() {
  const fileData = await readFile('matches.json', 'utf8');
  const data = JSON.parse(fileData);
  const today = new Date();
  const pastMatches = data.matches[0].matches.filter(match => {
    const matchDate = new Date(match.utcDate);
    return matchDate < today;
  });
  pastMatches.sort((a, b) => b.matchday - a.matchday);
  return pastMatches;
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
const _readFutureMatchesData = readFutureMatchesData;
export { _readFutureMatchesData as readFutureMatchesData };
const _readPastMatchesData = readPastMatchesData;
export { _readPastMatchesData as readPastMatchesData };
