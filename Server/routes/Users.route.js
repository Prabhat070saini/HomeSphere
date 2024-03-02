const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { updateUserdetials, deleteUser } = require('../controllers/updateProfile.controller');

const router = express.Router();


router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/updateProfile/:id', verifyToken, updateUserdetials);
router.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Success running..,,.Prabhatsaini"
    })
});

module.exports = router