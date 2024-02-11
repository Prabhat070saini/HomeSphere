const express = require('express');
const router = express.Router();

router.post('/login',);
router.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Success running..,,.Prabhatsaini"
    })
});

module.exports = router
