

module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
        return next()
    req.flash("PleaseLogin", "Please login to continue")
    req.session.fromUrl = req.originalUrl
    console.log(req.session.fromUrl)
    res.redirect("/login");


}