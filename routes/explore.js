const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
    res.render('explore');
});

router.get('/sql_search', function(req, res) {
    res.render('sql_search');
});

router.get('/filter_search', function(req, res) {
    res.render('filter_search');
});


module.exports = router;