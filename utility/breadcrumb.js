
var breadcrumb = function (req, res, next) {
    req.session.cur_url_path = req.originalUrl;
    var url_name = req.originalUrl.substring(1) + " home";
    req.session.cur_url_name = url_name;
    next();
}

module.exports = breadcrumb;