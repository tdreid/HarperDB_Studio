const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    favicon = require('express-favicon'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    hdb_callout = require('./utility/harperDBCallout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'resources')));
app.set('views', path.join(__dirname + '/pages'));
app.set('view engine', 'jade')
app.use(favicon("https://s3.amazonaws.com/hdb-marketing/harperdb__flavicon_4Cw_icon.ico"));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// route
var main = require('./routes/main'),
    login = require('./routes/login'),
    security = require('./routes/security'),
    explore = require('./routes/explore'),
    logs = require('./routes/logs'),
    logout = require('./routes/logout'),
    user_detail = require('./routes/user_detail'),
    schema = require('./routes/schema'),
    health = require('./routes/health'),
    help = require('./routes/help');

app.use('/main', main);
app.use('/login', login);
app.use('/security', security);
app.use('/explore', explore);
app.use('/logs', logs);
app.use('/logout', logout);
app.use('/user_detail', user_detail);
app.use('/schema', schema);
app.use('/health', health);
app.use('/help', help);
app.use('/', main);

//authen
passport.use(new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        var call_object = {
            username: username,
            password: password,
            endpoint_url: req.body.endpoint_url,
            endpoint_port: req.body.endpoint_port

        };

        var operation = {
            operation: 'user_info'
        };
        hdb_callout.callHarperDB(call_object, operation, function (err, user) {
            if (err) {
                return done(null, false, {
                    message: err
                });
            }

            if (user && user.active) {
                user.password = password;
                user.endpoint_url = req.body.endpoint_url;
                user.endpoint_port = req.body.endpoint_port;
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid credentials'
                });
            }

        });



    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var port = process.env.PORT || 61183;
app.listen(port, function () {
    console.log('Example app listening on port 61183!')
})