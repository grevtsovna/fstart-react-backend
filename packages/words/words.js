const router = require('express').Router();
const db = require('../db/db');

const creaateWordObject = word => ({
  id: String(Math.random()
    .toString(16)
    .split('.'[1])),
  word: word.word,
  translation: word.translation,
  color: 'transparent',
  answers: {
    correct: 0,
    incorrect: 0,
  },
});

router.get('/', (req, res) => {
  const words = db.get('tasks').value();

  res.json({ status: 'OK', data: words });
});

router.get('/:id', (req, res) => {
  const task = db
    .get('tasks')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: task });
});

// POST /tasks
router.post('/', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: { text: { type: 'string' } },
  //   required: ['text'],
  //   additionalProperties: false,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const task = newTask(req.body.text);

  console.log(task);

  db
    .get('tasks')
    .push(task)
    .write();

  res.json({ status: 'OK', data: task });
});

// PATCH /tasks/:id
router.patch('/:id', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const task = db
    .get('tasks')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: task });
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  db
    .get('tasks')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
