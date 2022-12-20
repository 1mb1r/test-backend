const jwt = require('jsonwebtoken');

const { NEED_AUTHORIZATION, ERROR_STATUS } = require('../constants/constants');

const { UNAUTHORIZED } = ERROR_STATUS;

const verifyToken = (req, res, next) => {
  const userToken = req.headers.token;
  if (!userToken) res.status(UNAUTHORIZED).send(NEED_AUTHORIZATION);
  req.userId = jwt.verify(userToken, process.env.SECRET_KEY, (error, data) => {
    if (error) {
      return res.status(UNAUTHORIZED).send(error.message);
    }
    return data;
  });
  return next();
};

module.exports = verifyToken;
