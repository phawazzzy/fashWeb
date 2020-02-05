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
  res.render('backend/dashboard', { title: 'Dashboard' })
}

exports.dashProduct = (req, res, next) => {
  let ImageError = req.flash('imageError')
  let success = req.flash('success')
  let failure = req.flash('Failure')
  res.render('backend/products', { title: 'Add new products', failure, success, ImageError })
}
exports.newProduct = async (req, res, next) => {
  // console.log(req.files[0].path)
  // console.log(singless)
  let productDetails = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    size: req.body.size,
    category: req.body.category,
    productCollection: req.body.collection
  };

  if (req.files) {
    try {
      let allFiles = req.files;
      let singless = allFiles.map((file) => {
        return {
          path: file.path,
          fileName: file.filename
        }
      })
      // console.log(singless);
      productDetails.productImage1 = singless[0].path
      productDetails.publicid1 = singless[0].fileName
      productDetails.productImage2 = singless[1].path
      productDetails.publicid2 = singless[1].fileName
      productDetails.productImage3 = singless[2].path
      productDetails.publicid3 = singless[2].fileName
    } catch (error) {
      console.log(error)
      req.flash('ImageError', `An error ${error} occured during the image upload`)
    }
  }

  console.log(productDetails);
  await ProductModel.create(productDetails).then((result) => {
    if (result) {
      req.flash('success', 'Upload Succesfully done')
    }
  }).catch(err => {
    console.log(err)
    req.flash('Failure', 'The Upload wasn`t succesful')
  })

  res.redirect('/dashboard/product')
}
exports.loginAdmin = (req, res, next) => {
  res.render('backend/login', { title: 'Login' })
}