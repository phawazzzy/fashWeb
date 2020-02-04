


exports.dashboard = (req, res, next) => {
    res.render('backend/dashboard', {title: 'Dashboard'})
  }

  exports.dashProduct = (req, res, next) => {
    res.render('backend/products', {title: 'Add new products'})
  }
exports.newProduct = (req, res, next) => {
  res.render('backend/newProduct', {title: 'add product'})
}  
exports.loginAdmin = (req, res, next) => {
    res.render('backend/login', { title: 'LOgin' })
}