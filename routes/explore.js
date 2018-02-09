const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
    res.render('explore');
});

router.get('/sql-search', function(req, res) {
    res.render('sql-search-chart');
});

router.get('/filter-search', function(req, res) {
    res.render('filter-search');
});


module.exports = router;