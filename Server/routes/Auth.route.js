const express = require('express');
const router = express.Router();
const { singup } = require('../controllers/auth.contoller.js')
router.post('/singup', singup)


module.exports = router