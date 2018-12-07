const router = require('express').Router();
const db = require('../db/db');
const shortid = require('shortid');
const moment = require('moment');

router.get('/', (req, res) => {
  const collections = db.get('collections').value();

  res.json({ status: 'OK', data: collections });
});

router.get('/:id', (req, res) => {
  const collection = db
    .get('collections')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: collection });
});

router.post('/', (req, res, next) => {
  if (req.body.name === '' || typeof req.body.name === 'undefined') {
    next(new Error('INVALID_API_FORMAT'));
  } else {
    next();
  }
}, (req, res) => {
  const collection = {
    id: shortid.generate(),
    name: req.body.name,
    words: [],
    timestamp: moment().unix()
  };

  db.get('collections')
    .push(collection)
    .write();
  res.json({ status: 'OK', data: collection });
});
router.get('/', (req, res) => {
  res.json({ status: 'OK', data: db.has('collections') });
});


router.patch('/:id/name', (req, res, next) => {
  if (typeof req.body.name === 'undefined') next(new Error('INVALID_API_FORMAT'));
  else next();
}, (req, res) => {
  const collection = db.get('collections')
    .find({ id: req.params.id })
    .assign({ name: req.body.name })
    .value();
  db.write();

  res.json({ status: 'OK', data: collection });
});

module.exports = router;
