const HttpError = require('../models/http-error.js');

const leagues = [
  {
    id: 'l1',
    name: 'england',
    title: 'premier-league',
    //image: England,
  },
  {
    id: 'l2',
    name: 'brazil',
    title: 'brazilian-a-series',
    //image: Brazil,
  },
  {
    id: 'l3',
    name: 'italy',
    title: 'seria-a',
    //image: Italy,
  },
  {
    id: 'l4',
    name: 'france',
    title: 'ligue-1',
    //image: France,
  },
  {
    id: 'l5',
    name: 'netherlands',
    title: 'eredivisie',
    //image: Netherlands,
  },
  {
    id: 'l6',
    name: 'spain',
    title: 'primera-division',
    //image: Spain,
  },
  {
    id: 'l7',
    name: 'portugal',
    title: 'primeira-liga',
    //image: Portugal,
  },
];

const getAllLeagues = (req, res, next) => {
  res.json({ leagues });
};

const getLeague = (req, res, next) => {
  const leagueId = req.params.lid;
  const leagueName = req.params.lname;
  const leagueTitle = req.params.ltitle;

  const league = leagues.find(league => {
    return league.id === leagueId && league.name === leagueName && league.title === leagueTitle;
  });

  if (!league) {
    return next(new HttpError('League not found.', 404));
  }
  res.json({ league });
};

exports.getLeague = getLeague;
exports.getAllLeagues = getAllLeagues;
