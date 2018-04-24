const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout'),
    reduceTypeLogs = require('../utility/reduceTypeLogs'),
    isAuthenticated = require('../utility/checkAuthenticate');

router.get('/', isAuthenticated, function (req, res) {
    res.render('live_link', {
        nameOfUser: req.user.username
    });
})

module.exports = router;