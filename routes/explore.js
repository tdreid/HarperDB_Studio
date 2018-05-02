const express = require('express'),
    router = express.Router(),
    hdb_callout = require('./../utility/harperDBCallout'),
    reduceDescribeAllObject = require('./../utility/reduceDescribeAllObject'),
    isAuthenticated = require('../utility/checkAuthenticate'),
    favorite = require('../utility/favoritesQuery');

router.get('/', isAuthenticated, function (req, res) {
    favorite.getLivelink(req).then(recents => {        
        res.render('explore', {
            recents: recents,
            nameOfUser: req.user.username
        });
    })

});

router.get('/sql_search', isAuthenticated, function (req, res) {

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    var operation = {
        operation: 'describe_all'
    };

    hdb_callout.callHarperDB(call_object, operation, function (err, result) {
        if (err || result.error) {
            console.log(err);
            return err;
        }


        var keywords = reduceDescribeAllObject(result);
        res.render('sql_search', {
            keywords: JSON.stringify(keywords),
            schemas: result,
            nameOfUser: req.user.username
        });
    });

});

router.get('/sql_search/:sqllink', isAuthenticated, function (req, res) {

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    var operation = {
        operation: 'describe_all'
    };

    hdb_callout.callHarperDB(call_object, operation, function (err, result) {
        if (err || result.error) {
            console.log(err);
            return err;
        }

        console.log(Buffer.from(req.params.sqllink, 'base64').toString());
        var keywords = reduceDescribeAllObject(result);
        res.render('sql_search', {
            keywords: JSON.stringify(keywords),
            schemas: result,
            sqlLink: Buffer.from(req.params.sqllink, 'base64').toString(),
            nameOfUser: req.user.username
        });
    });

});

router.get('/filter_search', isAuthenticated, function (req, res) {
    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    var operation = {
        operation: 'describe_all'
    };

    hdb_callout.callHarperDB(call_object, operation, function (err, result) {
        if (err || result.error) {
            console.log(err);
            return err;
        }
        res.render('filter_search', {
            schemas: JSON.stringify(result),
            nameOfUser: req.user.username
        });
    });

});

router.post('/filter_search', isAuthenticated, function (req, res) {
    var connection = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };

    var operation = {
        operation: 'sql',
        sql: req.body.sql
    };
    console.log(req.body);
    hdb_callout.callHarperDB(connection, operation, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        var obj = {
            result: result,
            sql: req.body.sql
        }

        return res.status(200).send(obj);
    });

})

router.post('/setfavorite', isAuthenticated, function (req, res) {
    var connection = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };
    var favoriteObj = {
        sql: req.body.sql,
        name: req.body.name,
        note: req.body.note,
    }

    favorite.setFavorites(req, res, favoriteObj).then((result) => {
        return res.status(200).send(result);
    })
})
module.exports = router;