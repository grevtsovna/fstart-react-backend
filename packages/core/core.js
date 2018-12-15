const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const error = require('../error/error');
const collectionsRoutes = require('../collections/collections');
const wordsRoutes = require('../words/words');
const testsRoutes = require('../tests/tests');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
});
app.use('/api/v1/collections', collectionsRoutes);
app.use('/api/v1/words', wordsRoutes);
app.use('/api/v1/tests', testsRoutes);

app.use((req, res) => {
  res.json({ status: 'BAD_REQUEST', messages: [error({ code: 'BAD_REQUEST' })] });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.json({ status: 'FAIL', messages: [error({ code: err.message })] });
});

module.exports = app;
