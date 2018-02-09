const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/ss', function(req, res) {
    res.render('index');
});

module.exports = router;