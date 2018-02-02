
var express = require('express')
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'resources')));

app.set('views', path.join(__dirname + '/pages'));
app.set('view engine', 'jade')

app.get('/main', function (req,res) {
    res.render('main', {youAreUsingJade:true});
});

app.get('/explore', function (req,res) {
    res.render('explore');
});

app.get('/explorefilter', function (req,res) {
    res.render('explorefilter');
});

app.get('/', function (req,res) {
    res.render('index');
});

app.listen(61183, function () {
    console.log('Example app listening on port 61183!')
})

