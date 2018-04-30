const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout'),
    reduceTypeLogs = require('../utility/reduceTypeLogs'),
    isAuthenticated = require('../utility/checkAuthenticate'),
    CryptoJS = require("crypto-js"),
    favorite = require('../utility/favoritesQuery');

const secretkey = 'gettingLiveLinkOnly123!!!';


router.post('/save', isAuthenticated, function (req, res) {
    var en_url = encryptLivelink(req);
    favorite.setLiveLink(req, res, en_url, req.body.livelinkName).then((result) => {
        return res.status(200).send(result);
    })
})

router.get('/livelinklist', isAuthenticated, function (req, res) {
    favorite.getLivelink(req, res).then(recents => {
        return res.status(200).send(recents);
    })
})

router.post('/getlivelink', isAuthenticated, function (req, res) {

    var en_url = encryptLivelink(req);
    return res.status(200).send(en_url);

})

router.get('/public/:key', function (req, res) {
    try {
        var decode64 = Buffer.from(req.params.key, 'base64').toString('ascii');
        var bytes = CryptoJS.RC4.decrypt(decode64, secretkey);
        var decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedObject);

        var call_object = {
            username: decryptedObject.username,
            password: decryptedObject.password,
            endpoint_url: decryptedObject.endpoint_url,
            endpoint_port: decryptedObject.endpoint_port
        };

        var operation = {
            operation: 'sql',
            sql: decryptedObject.sql
        };

        hdb_callout.callHarperDB(call_object, operation, function (error, data) {
            res.render('live_link', {
                graphDetail: JSON.stringify({
                    data: data,
                    options: decryptedObject.options,
                    graphType: decryptedObject.graphType,
                }),
                notes: decryptedObject.notes,
                livelinkName: decryptedObject.livelinkName
            });
        });
    } catch (err) {
        res.render('live_link', {
            error: err.message
        });
    }

})

var encryptLivelink = (req) => {
    var obj = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port,
        sql: req.body.sql,
        options: req.body.options,
        livelinkName: req.body.livelinkName,
        notes: req.body.notes,
        graphType: req.body.graphType
    }

    var ciphertext = CryptoJS.RC4.encrypt(JSON.stringify(obj), secretkey);
    var en_url = Buffer.from(ciphertext.toString()).toString('base64');
    return en_url;
}

module.exports = router;