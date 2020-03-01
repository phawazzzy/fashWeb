

module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else{
    req.flash("PleaseLogin", "Please login to continue")
    res.redirect("/login");
    }
}