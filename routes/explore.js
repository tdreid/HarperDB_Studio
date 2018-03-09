const express = require('express'),
    router = express.Router(),
    hdb_callout = require('./../utility/harperDBCallout'),
    reduceDescribeAllObject = require('./../utility/reduceDescribeAllObject');

router.get('/', function (req, res) {
    res.render('explore');
});

router.get('/sql_search', function (req, res) {
    if (!req.user || !req.user.active || !req.user.password) {
        return res.redirect('/login?ref=sql_search');
    }
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
            keywords: JSON.stringify(keywords)
        });
    });
 
});

router.get('/filter_search', function (req, res) {
    res.render('filter_search');
});


module.exports = router;