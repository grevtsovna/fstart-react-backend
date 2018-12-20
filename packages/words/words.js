const router = require('express').Router();
const db = require('../db/db');
const shortid = require('shortid');

router.get('/:id', (req, res) => {
  const word = db
    .get('words')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: word });
});

router.post('/', (req, res) => {
  const word = {
    id: shortid.generate(),
    ru: req.body.ru,
    de: req.body.de
  };

  db.get('words')
    .push(word)
    .write();
  res.json({ status: 'OK', data: word });
});

router.patch('/:id', (req, res) => {
  const word = db.get('word')
    .find({ id: req.params.id })
    .assign({
      ru: req.body.ru,
      de: req.body.de
    })
    .value();
  db.write();

  res.json({ status: 'OK', data: word });
});

router.delete('/:id', (req, res) => {
  db.get('words')
    .remove({ id: req.params.id })
    .write();

  db.get('collections')
    .find({ id: req.body.collectionId })
    .get('words')
    .remove(id => req.params.id === id)
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
