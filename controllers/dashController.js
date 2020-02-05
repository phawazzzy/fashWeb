const ProductModel = require('../models/products');
// const multer = require('multer');

// const diskStorage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: function(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const multerOpts = {
//   storage: diskStorage,
//   fileFilter: function(req, file, cb) {
//     checkFiletype(file, cb)
//   }
// }

// function checkFiletype(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname ){
//     return cb(null, true); 
//   } else {
//     cb(new Error('Error Occured: I can onlly take in images'));
//   }
// }

// const upload = multer(multerOpts);

exports.dashboard = (req, res, next) => {
    res.render('backend/dashboard', {title: 'Dashboard'})
  }

  exports.dashProduct = (req, res, next) => {
    res.render('backend/products', {title: 'Add new products'})
  }
exports.newProduct = async (req, res, next) => {
  console.log(req.files[0].path)
  let allFiles = req.files;
  let singless = allFiles.map((file) => {
    return {
      path: file.path
    }
  })
  console.log(singless)
  let productDetails = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    size: req.body.size,
    category: req.body.category,
    productCollection: req.body.collection
  };

  if(req.files) {
    productDetails.productImage = singless
    // productDetails.productImage1.image1Public_id = req.files[0].p
  }

  console.log(productDetails);
  res.redirect('/dashboard/product')
}  
exports.loginAdmin = (req, res, next) => {
    res.render('backend/login', { title: 'LOgin' })
}