const ProductModel = require('../models/products');
const cloudinary = require('../config/cloudinary')
const fs = require('fs');
const Order = require('../models/orders')
const Products = require('../models/products')

exports.dashboard = async (req, res, next) => {
  let pagename = 'dashboard'
  let result = await Order.find({})
  let result2 = await Products.find({})
  res.render('backend/dashboard', { title: 'Dashboard', result, result2, pagename })
}
exports.dashProduct = (req, res, next) => {
  let pagename = 'product'
  let ImageError = req.flash('imageError')
  let success = req.flash('success')
  let failure = req.flash('Failure')
  res.render('backend/products', { title: 'Add new products', pagename, failure, success, ImageError })
}

exports.newProduct = async (req, res, next) => {
  let productDetails = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    size: req.body.size,
    category: req.body.category,
    productCollection: req.body.collection
  };

  if (req.files) {
    console.log('i am hee')
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

exports.productList = async (req, res, next) => {
  let pagename = 'product'
  let result = await Products.find({}).then(result => {
    if (result) {
      // console.log(result)
      return result
    }
    else {
      return `we couldnt fetch the content from the DB`
      // throw new Error
    }
  })
  console.log('result', result)
  res.render('backend/productList', { title: 'product LIst', result, pagename })
}
exports.loginAdmin = (req, res, next) => {
  res.render('backend/login', { title: 'Login' })
}

exports.orders = async (req, res, next) => {
  let pagename = 'orders'
  let orders = await Order.find({}).then(results => {
    console.log(results)
    let mapped = results.map(doc => {
      let newArray = [];
      let quantity = doc.orderDetails.qty.forEach(doc => {
       newArray.push(doc.qty)
      })
      return {
        productId: doc.orderDetails.products,
        quantity: newArray,
        firstname: doc.orderDetails.firstname,
        lastname: doc.orderDetails.lastname,
        customerEmail: doc.orderDetails.email,
        address: `${doc.orderDetails.country} ${doc.orderDetails.street1} ${doc.orderDetails.town}`
      }
    })
    console.log("mapped", mapped)
    return mapped
  }).catch(err => {
    console.log(err)
  })
  // console.log(orders)

  try {
    let concated = []
    for (i = 0; i < orders.length; ++i) {
      let array1 = orders[i].orderDetails
      let array2 = orders[i].quantity
      let obj = {}
      let key = array1[i]
      let value = array2[i]
      obj[key] = value
      concated.push(obj)
      }
      console.log(concated)
  } catch (error) {
    console.log(error)
  }
  res.render('backend/orders', { title: 'ORDERS', pagename, orders })
}