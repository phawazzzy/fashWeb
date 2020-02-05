const ProductModel = require('../models/products');
const cloudinary = require('../config/cloudinary')
const fs = require('fs');

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
      const uploader = async (path) => await cloudinary.uploads(path, 'Phash');
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
      console.log(urls)

      productDetails.productImage1 = urls[0].url
      productDetails.publicid1 = urls[0].id
      productDetails.productImage2 = urls[1].url
      productDetails.publicid2 = urls[1].id
      productDetails.productImage3 = urls[2].url
      productDetails.publicid3 = urls[2].id
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