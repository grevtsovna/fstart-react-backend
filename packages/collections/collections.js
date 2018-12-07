const router = require('express').Router();
const db = require('../db/db');
const shortid = require('shortid');
const moment = require('moment');

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

  db
    .get('collections')
    .push(collection)
    .write();
  res.json({ status: 'OK', data: collection });
});
router.get('/', (req, res) => {
  res.json({ status: 'OK', data: db.has('collections') });
});

module.exports = router;
