


exports.dashboard = (req, res, next) => {
    res.render('backend/dashboard', {title: 'Dashboard'})
  }

exports.loginAdmin = (req, res, next) => {
    res.render('backend/login', { title: 'LOgin' })
}