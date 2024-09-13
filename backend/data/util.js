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
const _readCurrentMatchesData = readCurrentMatchesData;
export { _readCurrentMatchesData as readCurrentMatchesData };
const _readFutureMatchesData = readFutureMatchesData;
export { _readFutureMatchesData as readFutureMatchesData };
const _readPastMatchesData = readPastMatchesData;
export { _readPastMatchesData as readPastMatchesData };
