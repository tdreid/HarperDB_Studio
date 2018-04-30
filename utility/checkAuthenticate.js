var isAuthenticated = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        req.logout();
        ref = req.originalUrl.substr(1, req.originalUrl.length);
        var isAjaxRequest = req.xhr;
        if (isAjaxRequest)
            return res.status(401).send();
        else
            return res.redirect('/login?ref=' + ref);
    }

}

module.exports = isAuthenticated;