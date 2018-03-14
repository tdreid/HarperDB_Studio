const express = require('express'),
    router = express.Router(),
    hdb_callout = require('../utility/harperDBCallout'),
    isAuthenticated = require('../utility/checkAuthenticate');

router.get('/', isAuthenticated, function (req, res) {
    var operation = {
        operation: 'describe_all'
    };
    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    hdb_callout.callHarperDB(call_object, operation, function (err, allSchema) {

        return res.render('schema', {

            schemas: allSchema
        });
    });

});

router.post('/', isAuthenticated, function (req, res) {

    var operation = {
        operation: 'describe_all'
    };
    if (req.body.addType == 'schema') {
        var operationAdd = {
            "operation": "create_schema",
            "schema": req.body.schemaName
        }
    } else {
        var operationAdd = {
            "operation": "create_table",
            "schema": req.body.schemaName,
            "table": req.body.tableName,
            "hash_attribute": req.body.hashAttribute
        }
    }


    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port

    };

    hdb_callout.callHarperDB(call_object, operationAdd, function (err, success) {

        hdb_callout.callHarperDB(call_object, operation, function (error, allSchema) {
            return res.render('schema', {
                message: JSON.stringify(success),
                schemas: allSchema
            });
        });

    });
})

router.get('/:schemaName', isAuthenticated, function (req, res) {
    console.log(req.params);

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };

    var operation = {
        operation: 'describe_schema',
        "schema": req.params.schemaName
    };

    hdb_callout.callHarperDB(call_object, operation, function (error, schema) {
        res.render('schema_name', {
            schemaName: req.params.schemaName,
            schema: schema
        });
    });
});

router.post('/:schemaName', isAuthenticated, function (req, res) {

    var operationAdd = {
        "operation": "create_table",
        "schema": req.params.schemaName,
        "table": req.body.tableName,
        "hash_attribute": req.body.hashAttribute
    }

    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };

    var operation = {
        operation: 'describe_schema'
    };

    hdb_callout.callHarperDB(call_object, operationAdd, function (err, success) {

        hdb_callout.callHarperDB(call_object, operation, function (error, schema) {
            res.render('schema_name', {
                schemaName: req.params.schemaName,
                schema: schema,
                message:JSON.stringify(success)
            });
        });

    });

})

module.exports = router;