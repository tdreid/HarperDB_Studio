const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
    res.render('schema');
});

router.get('/:schemaName', function(req, res) {
    console.log(req.params);
    res.render('schema_name', {schemaName: req.params.schemaName});
});

module.exports = router;