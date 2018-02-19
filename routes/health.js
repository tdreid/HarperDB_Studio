var passport = require('passport');

const express = require('express')
const router = express.Router()


router.get('/', function (req, res) {

    res.render('health');
});


module.exports = router;