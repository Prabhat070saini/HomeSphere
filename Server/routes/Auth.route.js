const express = require('express');
const router = express.Router();
const { singup, login, google } = require('../controllers/auth.contoller.js')
router.post('/signup', singup);
router.post('/signin', login);

router.post('/google', google)
module.exports = router