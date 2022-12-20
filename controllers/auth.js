const jwt = require('jsonwebtoken');

const {
  ERROR_STATUS,
  EMPTY_FIELDS,
  ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  OK,
} = require('../constants/constants');
const { User } = require('../models');

const { SERVER_ERROR, BAD_REQUEST } = ERROR_STATUS;
const JWT = process.env.SECRET_KEY;

const userRegistration = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!email || !password || !username) {
      return res.status(BAD_REQUEST).send(EMPTY_FIELDS);
    }
    const existedUser = await User.findOne({ where: { email } });
    if (existedUser) {
      return res.status(BAD_REQUEST).send(ALREADY_EXISTS);
    }
    const user = await User.create({
      username,
      password,
      email,
    });
    return res.status(OK).send({ user });
  } catch (error) {
    return res.status(SERVER_ERROR).send(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(BAD_REQUEST).send(EMPTY_FIELDS);
    }
    const candidate = await User.findOne({ where: { email } });
    if (!candidate) {
      return res.status(BAD_REQUEST).send(USER_NOT_FOUND);
    }
    const isPasswordValid = await candidate.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(BAD_REQUEST).send(WRONG_PASSWORD);
    }
    delete candidate.dataValues.password;
    const token = jwt.sign(candidate.id, JWT);
    return res.status(OK).send({ candidate, token });
  } catch (error) {
    return res.status(SERVER_ERROR).send(error);
  }
};

const userAuth = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId }, attributes: { exclude: ['password'] } });
    return res.status(OK).send(user);
  } catch (error) {
    return res.status(BAD_REQUEST).send(USER_NOT_FOUND);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userAuth,
};
