const router = require('express').Router();
const db = require('../db/db');
const _ = require('lodash');

router.get('/:id', (req, res) => {
  const wordsId = db.get('collections')
    .find({ id: req.params.id })
    .get('words')
    .shuffle()
    .take(5)
    .value();

  const words = wordsId.map((wordId) => (
    db.get('words')
      .find({ id: wordId })
      .value()
  ));

  const answers = db.get('words')
    .map('ru')
    .take(3)
    .value();

  const testData = words.map((word) => ({
    id: word.id,
    de: word.de,
    answers: _([...answers, word.ru]).shuffle()
  }));

  res.json({status: 'OK', data: testData});
});

router.post('/check', (req, res) => {
  const word = db.get('words')
    .find({ id: req.body.id })
    .value();

  const isCorrect = word.ru === req.body.answer;

  res.json({ status: 'OK', data: isCorrect });
});

module.exports = router;
