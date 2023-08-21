const HttpError = require('../models/http-error.js');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const League = require('../models/league.js');
const Club = require('../models/club.js');

const createClub = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const { name, league } = req.body;

  const createdClub = new Club({
    name,
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg',
    league,
  });

  let leagueExists;
  try {
    leagueExists = await League.findById(league);
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Creating club failed, please try again', 500));
  }

  if (!leagueExists) {
    return next(new HttpError('Could not find league for provided league id', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdClub.save({ session: sess });
    leagueExists.clubs.push(createdClub);
    await leagueExists.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError('Creating club failed, please try again.', 500));
  }

  res.status(201).json({ club: createdClub });
};

const formatName = cname => {
  const words = cname.split('-');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};

const getAllClubs = async (req, res, next) => {
  let clubs;

  try {
    clubs = await Club.find({}, 'name image league');
  } catch (error) {
    return next(new HttpError('Fetching clubs failed, please try again later.', 500));
  }

  res.json({ clubs: clubs.map(club => club.toObject({ getters: true })) });
};


const getClubByName = async (req, res, next) => {
  const { cname } = req.params;

  const formatedName = formatName(cname);

  let club;
  try {
    club = await Club.findOne({ name: formatedName });
  } catch (error) {
    return next(new HttpError('Club with that name does not exist.', 401));
  }

  if (!club) {
    return next(new HttpError('Club not found.', 404));
  }

  res.json({ club: club.toObject({ getters: true }) });
};

const getClubsByLeagueTitle = async (req, res, next) => {
  const title = req.params.ltitle;

  const formattedTitle = formatName(title);

  let leagueWithClubs;
  try {
    leagueWithClubs = await League.findOne({ title: formattedTitle }).populate('clubs');
  } catch (error) {
    return next(new HttpError('Fetching clubs failed, please try again later', 500));
  }

  if (!leagueWithClubs || leagueWithClubs.clubs.length === 0) {
    return next(new HttpError('Could not find clubs for the provided league id.', 404));
  }

  res.json({
    clubs: leagueWithClubs.clubs.map(club => club.toObject({ getters: true })),
  });
};

exports.createClub = createClub;
exports.getAllClubs = getAllClubs;
exports.getClubByName = getClubByName;
exports.getClubsByLeagueTitle = getClubsByLeagueTitle;
