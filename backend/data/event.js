import { v4 as generateId } from 'uuid';

import { NotFoundError } from '../util/errors.js';
import { readData, readLeagueData, readTeamData, readStandingData, readFutureMatchesData, readPastMatchesData, writeData } from './util.js';

async function getAll() {
  const storedData = await readData();
  if (!storedData.events) {
    throw new NotFoundError('Could not find any event.');
  }
  return storedData.events;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError('Could not find any events.');
  }
  
  const event = storedData.events.find((ev) => ev.id == id);

  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  return event;
}

async function getLeagues() {
  const storedData = await readLeagueData();
  if (!storedData.leagues) {
    throw new NotFoundError('Could not find any leagues.');
  }
  return storedData.leagues;
}

async function getTeams() {
  const storedData = await readTeamData();
  if (!storedData.teams) {
    throw new NotFoundError('Could not find any teams.');
  }
  return storedData.teams;
}

async function getLeague(id) {
  const storedData = await readLeagueData();

  if (!storedData.leagues || storedData.leagues.length === 0) {
    throw new NotFoundError('Could not find any leagues.');
  }
  
  const league = storedData.leagues.find((ev) => ev.id == id);

  if (!league) {
    throw new NotFoundError('Could not find league for id ' + id);
  }

  return league;
}

async function getStanding(id) {
  const storedData = await readStandingData();

  if (!storedData.standings || storedData.standings.length === 0) {
    throw new NotFoundError('Could not find any competition.');
  }
  
  const standing = storedData.standings.find((ev) => ev.competition.id == id).standings;

  if (!standing) {
    throw new NotFoundError('Could not find league for id ' + id);
  }

  return standing;
}

async function getFutureMatches() {
  const storedData = await readFutureMatchesData();
  return storedData;
}

async function getPastMatches() {
  const storedData = await readPastMatchesData();
  // console.log(storedData.matches[0]);
  // if (!storedData.matches[0] || storedData.matches.length === 0) {
  //   throw new NotFoundError('Could not find any matches.');
  // }

  // const matches = storedData.matches;
  // console.log(matches);

  // ZASAD JE OVAKO BEZ RAZUMA
  // const standing = storedData.standings.find((ev) => ev.competition.id == id).standings;
  // if (!standing) {
  //   throw new NotFoundError('Could not find league for id ' + id);
  // }

  return storedData;
}

async function add(data) {
  const storedData = await readData();
  storedData.events.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError('Could not find any events.');
  }

  const index = storedData.events.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  storedData.events[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, events: updatedData });
}

const _getAll = getAll;
export { _getAll as getAll };
const _get = get;
export { _get as get };
const _getLeagues = getLeagues;
export { _getLeagues as getLeagues };
const _getLeague = getLeague;
export { _getLeague as getLeague };
const _getTeams = getTeams;
export { _getTeams as getTeams };
const _getStanding = getStanding;
export { _getStanding as getStanding };
const _getFutureMatches = getFutureMatches;
export { _getFutureMatches as getFutureMatches };
const _getPastMatches = getPastMatches;
export { _getPastMatches as getPastMatches };
const _add = add;
export { _add as add };
const _replace = replace;
export { _replace as replace };
const _remove = remove;
export { _remove as remove };
