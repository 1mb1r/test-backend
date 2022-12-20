const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const { ERROR_STATUS } = require('./constants/constants');

const { NOT_FOUND, SERVER_ERROR } = ERROR_STATUS;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  next(createError(NOT_FOUND));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || SERVER_ERROR);
  res.render('error');
});

module.exports = app;
