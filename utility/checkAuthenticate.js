var isAuthenticated = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        req.logout();
        ref = req.originalUrl.substr(1, req.originalUrl.length);

        return res.redirect('/login?ref=' + ref);
    }

}

module.exports = isAuthenticated;