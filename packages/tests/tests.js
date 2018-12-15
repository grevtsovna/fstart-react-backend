const router = require('express').Router();
const db = require('../db/db');

router.get('/:id', (req, res) => {
  const wordsId = db.get('collections')
    .find({ id: req.params.id })
    .get('words')
    .take(5)
    .value();

  const words = wordsId.map((wordId) => (
    db.get('words')
      .find({ id: wordId })
      .value()
  ));

  const testData = words.map((word) => ({
    id: word.id,
    de: word.de
  }));

  res.json({status: "OK", data: testData});
});

module.exports = router;
