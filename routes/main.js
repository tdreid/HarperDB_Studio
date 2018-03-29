const express = require('express'),
    router = express.Router(),
    isAuthenticated = require('../utility/checkAuthenticate');

router.get('/', isAuthenticated, function (req, res) {
    res.render('index', {nameOfUser: req.user.username});
});


module.exports = router;