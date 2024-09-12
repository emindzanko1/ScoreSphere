import { Router } from 'express';

import {
  getAll,
  get,
  getLeagues,
  getLeague,
  getTeams,
  getStanding,
  getFutureMatches,
  getPastMatches,
  add,
  replace,
  remove,
} from '../data/event.js';
import { checkAuth } from '../util/auth.js';
import { isValidText, isValidDate, isValidImageUrl } from '../util/validation.js';

const router = Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const leagues = await getAll();
    res.json({ leagues });
  } catch (error) {
    next(error);
  }
});

router.get('/all-leagues', async (req, res, next) => {
  try {
    const leagues = await getLeagues();
    res.json({ leagues });
  } catch (error) {
    next(error);
  }
});


router.get('/all-teams', async (req, res, next) => {
  try {
    const teams = await getTeams();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

router.get('/futureMatches', async (req, res, next) => {
  try {
    const matches = await getFutureMatches();
    res.json({ matches });
  } catch (error) {
    next(error);
  }
});

router.get('/pastMatches', async (req, res, next) => {
  try {
    const matches = await getPastMatches();
    res.json({ matches });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const league = await getLeague(req.params.id);
    res.json({ league });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/standings', async (req, res, next) => {
  try {
    const standing = await getStanding(req.params.id);
    res.json({ standing: standing });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: 'Event saved.', event: data });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Event updated.', event: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});

export default router;
