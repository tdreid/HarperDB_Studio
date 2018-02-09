const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
    res.render('security');
});

module.exports = router;