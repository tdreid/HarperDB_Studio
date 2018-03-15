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

router.post('/addtable/:schemaName', isAuthenticated, function (req, res) {

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
        operation: 'describe_schema',
        "schema": req.params.schemaName
    };

    hdb_callout.callHarperDB(call_object, operationAdd, function (err, success) {

        hdb_callout.callHarperDB(call_object, operation, function (error, schema) {
            console.log(req.params.schemaName, ' ', schema);
            res.render('schema_name', {
                schemaName: req.params.schemaName,
                schema: schema,
                message: JSON.stringify(success)
            });
        });

    });

})

router.post('/upload_csv/:schemaName', isAuthenticated, function (req, res) {
    console.log(req.body);
    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };

    var operation = {
        operation: 'describe_schema',
        "schema": req.body.schemaName
    };
    var operationCSV = {}

    if (req.body.csvType == 'file') {
        operationCSV = {
            "operation": "csv_file_load",
            "schema": req.body.schemaName,
            "table": req.body.tableName,
            "file_path": req.body.csvPath
        }
    } else if (req.body.csvType == 'url') {
        operationCSV = {
            "operation": "csv_url_load",
            "schema": req.body.schemaName,
            "table": req.body.tableName,
            "csv_url": req.body.csvUrl
        }
    } else {
        operationCSV = {
            "operation": "csv_data_load",
            "schema": req.body.schemaName,
            "table": req.body.tableName,
            "data": req.body.csvData
        }
    }

    hdb_callout.callHarperDB(call_object, operationCSV, function (err, success) {

        hdb_callout.callHarperDB(call_object, operation, function (error, schema) {

            res.render('schema_name', {
                schemaName: req.params.schemaName,
                schema: schema,
                message: JSON.stringify(success)
            });
        });

    });
});

router.post('/delete', isAuthenticated, function (req, res) {
    var call_object = {
        username: req.user.username,
        password: req.user.password,
        endpoint_url: req.user.endpoint_url,
        endpoint_port: req.user.endpoint_port
    };

    var operation = {
        operation: 'describe_schema',
        "schema": req.body.schemaName
    };
    var operationdelete = {}

    if (req.body.deleteType == 'schema') {
        operationdelete = {
            "operation": "drop_schema",
            "schema": req.body.schemaName
        }
    } else operationdelete = {
        "operation": "drop_table",
        "schema": req.body.schemaName,
        "table": req.body.tableName
    }

    hdb_callout.callHarperDB(call_object, operationdelete, function (error, schema) {
        if (req.body.deleteType == 'schema')
            res.redirect('/schema');
        else
            res.redirect('/schema/' + req.body.schemaName);
    });
});

module.exports = router;