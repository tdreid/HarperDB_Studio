const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout');

router.get('/', function (req, res) {
    if (!req.user || !req.user.active || !req.user.password) {
        return res.redirect('/login?ref=security');
    }

    var operation = {
        operation: 'list_users'
    };

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    hdb_callout.callHarperDB(call_object, operation, function (err, users) {
        // console.error(err);
        // console.log(logs);
        return res.render('security', {
            user: req.user,
            users: JSON.stringify(users),
            error: err
        });
    });




});


router.post('/update_user', function (req, res) {
    if (!req.user || !req.user.active || !req.user.password) {
        return res.redirect('/login?ref=security');
    }

    if (!req.body) {
        return res.send('missing body');
    }


    if (!req.body.username) {
        return res.send('missing username');

    }


    var operation = {
        "operation": "alter_user"

    };

    for (item in req.body) {
        if (item.indexOf('role') < 0)
            operation[item] = req.body[item];
        if (item === "role[id]") {
            operation["role"] = req.body[item];
        }
    }

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    hdb_callout.callHarperDB(call_object, operation, function (err, success) {
        if (err) {
            return res.status(400).send(err);
        }

        return res.status(200).send(success);

    });

});

module.exports = router;