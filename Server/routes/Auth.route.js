const express = require('express');
const router = express.Router();
const { singup, login } = require('../controllers/auth.contoller.js')
router.post('/signup', singup);
router.post('/signin', login);


module.exports = router