const router = require('express').Router();
const db = require('../db/db');
const _ = require('lodash');

router.get('/:id', (req, res) => {
  const wordsId = db.get('collections')
    .find({ id: req.params.id })
    .get('words')
    .take(5)
    .shuffle()
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

  res.json({ status: 'OK', data: testData });
});

router.post('/check', (req, res) => {
  const word = db.get('words')
    .find({ id: req.body.id });

  const wordValue = word.value();
  const isCorrect = wordValue.ru === req.body.answer;

  if (isCorrect) {
    word.get('statistics').update('success', quantity => quantity + 1).write();
  } else {
    word.get('statistics').update('fail', quantity => quantity + 1).write();
  }

  res.json({ status: 'OK', data: isCorrect });
});

module.exports = router;
