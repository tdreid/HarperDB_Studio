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

// saveToLocalStorage(reduceDescribeAllObject(simpleObj));
module.exports = reduceDescribeAllObject;