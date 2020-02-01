


exports.dashboard = (req, res, next) => {
    res.render('backend/dashboard', {title: 'Dashboard'})
  }

exports.newProduct = (req, res, next) => {
  res.render('backend/newProduct', {title: 'add product'})
}  
exports.loginAdmin = (req, res, next) => {
    res.render('backend/login', { title: 'LOgin' })
}