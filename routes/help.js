var passport = require('passport');

const express = require('express')
const router = express.Router()
var isAuthenticated = require('../utility/checkAuthenticate');

router.get('/', isAuthenticated, function (req, res) {

    res.render('help', {nameOfUser: req.user.username});
});


module.exports = router;