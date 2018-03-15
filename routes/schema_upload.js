const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout');

router.get('/', function (req, res) {
    if (!req.user || !req.user.active || !req.user.password) {
        return res.redirect('/login?ref=logs');
    }   

    var operation = {
        "operation": "read_log",
        "limit": 1000,
        "start": 0,
        "from": "2017-07-10",
        "until": "2019-07-11",
        "order": "desc"
    };

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    hdb_callout.callHarperDB(call_object, operation, function (err, logs) {

        return res.render('logs', {
            user: req.user,
            logs: JSON.stringify(reduceTypeLogs(logs)),
            error: err
        });
    });

});

router.get('/individual', function (req, res) {
    res.render('log_individual');
});

router.get('/search', function (req, res) {
    res.render('logs_advance');
});

module.exports = router;