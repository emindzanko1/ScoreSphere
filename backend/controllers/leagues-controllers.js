const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error.js');
const League = require('../models/league.js');

const createLeague = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const { name, title } = req.body;

  let existingLeague;

  try {
    existingLeague = await League.findOne({ title: title });
  } catch (error) {
    return next(new HttpError('Creating league failed, please try again.', 500));
  }

  if (existingLeague) {
    return next(new HttpError('League exists already, please try different league instead.', 422));
  }

  const createdLeague = new League({
    name,
    title,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/255px-Flag_of_Portugal.svg.png',
  });

  try {
    await createdLeague.save();
  } catch (error) {
    return next(new HttpError('Creating league failed, please try again.', 500));
  }
  res.status(201).json({ league: createdLeague.toObject({ getters: true }) });
};

const getAllLeagues = async (req, res, next) => {
  let leagues;

  try {
    leagues = await League.find({}, 'name title image');
  } catch (error) {
    return next(new HttpError('Fetching leagues failed, please try again later.', 500));
  }

  res.json({ leagues: leagues.map(league => league.toObject({ getters: true })) });
};

const formatTitle = ltitle => {
  const words = ltitle.split('-');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};

const getLeagueByTitle = async (req, res, next) => {
  const { ltitle } = req.params;

  formatTitle(ltitle);

  const formattedTitle = formatTitle(ltitle);
  let league;
  try {
    league = await League.findOne({ title: formattedTitle });
  } catch (error) {
    return next(new HttpError('League with that name does not exist.', 401));
  }

  if (!league) {
    return next(new HttpError('League not found.', 404));
  }

  res.json({ league: league.toObject({ getters: true }) });
};

exports.createLeague = createLeague;
exports.getLeagueByTitle = getLeagueByTitle;
exports.getAllLeagues = getAllLeagues;
