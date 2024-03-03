const express = require('express');
const { createListing, deleteListing, updateListing, getList } = require('../controllers/listing.controller');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();


router.post(`/create`, verifyToken, createListing);
router.delete(`/delete/:id`, verifyToken, deleteListing)
router.post(`/update/:id`, verifyToken, updateListing)
router.get(`/getlist/:id`, getList);
module.exports = router