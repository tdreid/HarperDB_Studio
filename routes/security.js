const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout'),
    isAuthenticated = require('../utility/checkAuthenticate');


router.get('/', isAuthenticated, function (req, res) {

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

router.get('/add_role', function (req, res) {
    res.render('add_role');
});

router.get('/add_user', function (req, res) {
    res.render('add_user');
});

router.get('/edit_role', function (req, res) {
    res.render('edit_role');
});

router.get('/edit_user', function (req, res) {
    res.render('edit_user');
});

router.post('/getalluser', function (req, res) {
    var connection = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };
    var operation = {
        "operation": "list_users"
    }
    hdb_callout.callHarperDB(connection, operation, function (err, user) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(user);
        return res.status(200).send(user);
    });
});

router.post('/getallrole', function (req, res) {
    var connection = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };
    var operation = {
        "operation": "list_roles"
    }
    hdb_callout.callHarperDB(connection, operation, function (err, roles) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(roles);
        return res.status(200).send(roles);
    });
});

router.post('/adduser', function (req, res) {
    var connection = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };
    var operation = {
        operation: "add_user",
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        active: req.body.active

    }
    hdb_callout.callHarperDB(connection, operation, function (err, user) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(user);
        return res.status(200).send(user);
    });
});



module.exports = router;