const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error.js');

const leagues = [
  {
    id: uuidv4(),
    name: 'england',
    title: 'premier-league',
    //image: England,
  },
  {
    id: uuidv4(),
    name: 'brazil',
    title: 'brazilian-a-series',
    //image: Brazil,
  },
  {
    id: uuidv4(),
    name: 'italy',
    title: 'seria-a',
    //image: Italy,
  },
  {
    id: uuidv4(),
    name: 'france',
    title: 'ligue-1',
    //image: France,
  },
  {
    id: uuidv4(),
    name: 'netherlands',
    title: 'eredivisie',
    //image: Netherlands,
  },
  {
    id: uuidv4(),
    name: 'spain',
    title: 'primera-division',
    //image: Spain,
  },
  {
    id: uuidv4(),
    name: 'portugal',
    title: 'primeira-liga',
    //image: Portugal,
  },
];

const getAllLeagues = (req, res, next) => {
  res.json({ leagues });
};

const getLeague = (req, res, next) => {
  const leagueName = req.params.lname;
  const leagueTitle = req.params.ltitle;

  const league = leagues.find(league => {
     return league.name === leagueName && league.title === leagueTitle;
  });

  if (!league) {
    return next(new HttpError('League not found.', 404));
  }
  res.json({ league });
};

exports.getLeague = getLeague;
exports.getAllLeagues = getAllLeagues;
