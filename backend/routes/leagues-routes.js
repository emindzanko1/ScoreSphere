const express = require('express');

const router = express.Router();

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

router.get('/', function (req, res, next) {
  res.json({ leagues });
});

router.get('/leagues', function (req, res, next) {
  res.json({ leagues });
});

router.get('/:lname/:ltitle/:lid/', function (req, res, next) {
  const leagueId = req.params.lid;
  const leagueName = req.params.lname;
  const leagueTitle = req.params.ltitle;

  const league = leagues.find(league => {
    return league.id === leagueId && league.name === leagueName && league.title === leagueTitle;
  });

  if (!league) {
    const error = new Error('League not found.');
    error.code = 404;
    return next(error);
  }
  res.json({ league });
});

router.get('/search', function (req, res, next) {
  res.json({ message: 'Welcome to the search route' });
});

router.get('/login', function (req, res, next) {
  res.json({ message: 'Welcome to  the login route' });
});

module.exports = router;
