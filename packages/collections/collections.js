const router = require('express').Router();
const db = require('../db/db');
const shortid = require('shortid');

router.post('/', (req, res) => {
  const collection = {
    id: shortid.generate(),
    name: 'test',
    words: [],
  };

  db
    .get('collections')
    .push(collection)
    .write();
  res.json({ status: 'OK', data: db.has('collections').value() });
});

router.get('/', (req, res) => {
  res.json({ status: 'OK', data: db.has('collections') });
});

module.exports = router;
