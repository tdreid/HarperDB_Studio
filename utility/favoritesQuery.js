var hdb_callout = require('./harperDBCallout');
var guid = require('guid');

var setFavorites = function (req, res, favoriteObj) {
    return new Promise(function (resolve) {
        var call_object = {
            username: req.user.username,
            password: req.user.password,
            endpoint_url: req.user.endpoint_url,
            endpoint_port: req.user.endpoint_port
        };

        var record = {
            sql: favoriteObj.sql,
            name: favoriteObj.name,
            note: favoriteObj.note,
            date: new Date(),
            id: guid.create()
        }

        var operation = {
            operation: 'insert',
            schema: 'favorite_url',
            table: req.user.username,
            records: [record]
        };
        hdb_callout.callHarperDB(call_object, operation, function (err, result) {
            if (err || result.error) {
                createUserFavoriteTable(req, res).then(() => {
                    hdb_callout.callHarperDB(call_object, operation, function (err2, result2) {
                        resolve(result2);
                    });

                })
            }
            resolve(result);
        });
    })
}

var getFavorites = function (req, res) {
    return new Promise(function (resolve) {
        var call_object = {
            username: req.user.username,
            password: req.user.password,
            endpoint_url: req.user.endpoint_url,
            endpoint_port: req.user.endpoint_port
        };

        var operation = {
            operation: 'sql',
            sql: 'SELECT * FROM favorite_url.' + "\"" + req.user.username + "\"" + "ORDER BY date DESC  LIMIT 10"
        };

        hdb_callout.callHarperDB(call_object, operation, function (err, result) {
            if (err || result.error) {
                createUserFavoriteTable(req, res).then(() => {
                    hdb_callout.callHarperDB(call_object, operation, function (err2, result2) {
                        resolve(result2);
                    });
                })

            } else {
                resolve(result);
            }

        });
    })

}

var createUserFavoriteTable = function (req, res) {
    return new Promise(function (resolve) {
        var call_object = {
            username: req.user.username,
            password: req.user.password,
            endpoint_url: req.user.endpoint_url,
            endpoint_port: req.user.endpoint_port

        };

        var operation = {
            operation: 'create_table',
            schema: 'favorite_url',
            table: req.user.username,
            "hash_attribute": "id",

        };
        createFavoriteSearchSchema(req, res).then(() => {
            hdb_callout.callHarperDB(call_object, operation, function (err, result) {
                if (err || result.error) {
                    resolve(result);
                }
                resolve(result);
            });
        })


    });
}

var createFavoriteSearchSchema = function (req, res) {
    return new Promise(function (resolve) {
        var call_object = {
            username: req.user.username,
            password: req.user.password,
            endpoint_url: req.user.endpoint_url,
            endpoint_port: req.user.endpoint_port

        };

        var operation = {
            operation: 'create_schema',
            schema: 'favorite_url'
        };

        hdb_callout.callHarperDB(call_object, operation, function (err, result) {
            if (err || result.error) {
                console.log(err);
                resolve(err);

            }
            console.log(result);
            resolve(result);
        });
    })

}

module.exports = {
    setFavorites: setFavorites,
    createFavoriteSearchSchema: createFavoriteSearchSchema,
    createUserFavoriteTable: createUserFavoriteTable,
    getFavorites: getFavorites

}