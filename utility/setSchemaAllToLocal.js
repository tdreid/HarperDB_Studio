var hdb_callout = require('./harperDBCallout');

reduceDescribeAllObject = (objectAll) => {
    var schemaNames = [];
    var schemaAndChilds = {};

    for (var eachSchema in objectAll) {

        // first level: save only shcemaName
        schemaNames.push(eachSchema);
        var curTable = [];
        // second level: save schema.table
        for (var eachTable in objectAll[eachSchema]) {
            curTable.push(eachTable);
            var curAttr = [];
            // last level: save table.attribute
            for (var eachAttr in objectAll[eachSchema][eachTable]) {
                if (eachAttr == 'attributes') {
                    curAttr = objectAll[eachSchema][eachTable][eachAttr].map(a => a.attribute);
                }
            }
            schemaAndChilds[eachTable] = curAttr;
        }
        schemaAndChilds[eachSchema] = curTable;
    }

    return [schemaNames, schemaAndChilds];
}

var simpleObj = {
    "dev": {
        "dog": {
            "hash_attribute": "id",
            "id": "71f3a8fa-227c-4955-a428-08db1bfd8a89",
            "name": "dog",
            "residence": [
                "node_s",
                "node_1",
                "node_2"
            ],
            "schema": "dev",
            "attributes": [{
                    "attribute": "name"
                },
                {
                    "attribute": "id"
                },
                {
                    "attribute": "age"
                },
                {
                    "attribute": "breed"
                }
            ]
        },
        "cat": {
            "hash_attribute": "cat_id",
            "id": "71f3a8fa-227c-4955-a428-08db1bfd8a89",
            "name": "cat",
            "residence": [
                "node_s",
                "node_1",
                "node_2"
            ],
            "schema": "dev",
            "attributes": [{
                    "attribute": "gender"
                },
                {
                    "attribute": "color"
                },
                {
                    "attribute": "cat_id"
                }
            ]
        }
    },
    "test": {
        "customer": {
            "hash_attribute": "cus_id",
            "id": "71f3a8fa-227c-4955-a428-08db1bfd8a89",
            "name": "customer",
            "residence": [
                "node_s",
                "node_1",
                "node_2"
            ],
            "schema": "test",
            "attributes": [{
                    "attribute": "cus_id"
                },
                {
                    "attribute": "first_name"
                },
                {
                    "attribute": "last_name"
                }
            ]
        }
    }
}


var obj2 = {
    "b1": {
        "dog": {
            "hash_attribute": "id",
            "id": "71f3a8fa-227c-4955-a428-08db1bfd8a89",
            "name": "dog",
            "residence": [
                "node_s",
                "node_1",
                "node_2"
            ],
            "schema": "dev"
        }
    },
    "b2": {},
    "n3": {},
}
// saveToLocalStorage(reduceDescribeAllObject(simpleObj));
module.exports = reduceDescribeAllObject;