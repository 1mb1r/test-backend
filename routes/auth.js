const express = require('express');

const {
  userRegistration,
  userLogin,
  userAuth,
} = require('../controllers/auth');

const verifyToken = require('../controllers/token');

const router = express.Router();

router.post('/registration', userRegistration);
router.post('/login', userLogin);
router.get('/user/:id', verifyToken, userAuth);

module.exports = router;
