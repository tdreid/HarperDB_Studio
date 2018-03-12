var isAuthenticated = function (req, res, next) {
    console.log(req.originalUrl);
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.logout();
        ref = req.originalUrl.substr(1, req.originalUrl.length);
        console.log(ref);
        return res.redirect('/login?ref=' + ref);
    }

}

module.exports = isAuthenticated;