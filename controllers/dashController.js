const ProductModel = require('../models/products');
const Cloudinary = require('../config/cloudinary');
const cloud = require('cloudinary')
const fs = require('fs');
const Order = require('../models/orders')
const Products = require('../models/products')
const Slider = require('../models/slider')
let oldImage = {};

// Get old image path
// async function getOldImage(req, res, next) {
//     oldImage = await Page.findOne({ tag: req.params.tag.trim() });
//     return next();
// }

// remove old uploaded image
async function removeOldImage() {
  if (oldImage) {
    // Cloudinary
    cloud.v2.uploader.destroy(oldImage.publicid, function (error, result) {
      if (error) {
        console.log(error)
      }
      console.log(("Removed image at", oldImage.postImage), (" ==> status", result))

    });
  } ''
}


// async function oneImage(file) {
//   const { path } = file;
//   console.log(path)
//   const uploader = await Cloudinary.uploads(path, 'Phash');
//   console.log(uploader)
//   fs.unlinkSync(path)
//   return uploader
// }

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
    productCollection: req.body.collection,
    tag: req.body.tag

  };

  if (req.files) {
    console.log('i am hee')
    try {
      const uploader = async (path) => await Cloudinary.uploads(path, 'Phash');
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

exports.sliderAdd = async (req, res, next) => {
  let pagename = 'slider'
  let success = req.flash('success')
  let imageError = req.flash('imageError')
  res.render('backend/slider-add', { pagename, success, imageError });
}

exports.sliderpost = async (req, res, next) => {
  let sliderDetails = {
    sliderName: req.body.sliderName,
    text_on_slider: req.body.TextOnSlider
  }

  console.log(sliderDetails)
  if (req.file) {
    console.log(req.file)
    try {
      var file = req.file
      const { path } = file;
      console.log(path)
      const uploader = await Cloudinary.uploads(path, 'Phash');
      console.log(uploader)
      fs.unlinkSync(path)
      sliderDetails.sliderImage = uploader.url
      sliderDetails.publicid = uploader.id
      console.log(sliderDetails)
      await Slider.create(sliderDetails).then(result => {
        if (result) {
          console.log(result)
          req.flash('success', 'Upload Succesfully done')
        }
      })
    } catch (error) {
      console.log(error)
      req.flash('ImageError', `An error ${error} occured during the image upload`)
    }
  }
  res.redirect('/dashboard/slider/add')
}

exports.sliderEdit = async (req, res, next) => {
  let pagename = 'slider'
  let id = req.params.id
  console.log(req.originalUrl)
  console.log(id)
  let result = await Slider.findById(id)
  console.log(result)
  res.render('backend/slider-add', { pagename, result, url: req.originalUrl });
}

exports.editSlider = async (req, res, next) => {
  let id = req.params.id
  console.log(id)
  let sliderDetails = {
    sliderName: req.body.sliderName,
    text_on_slider: req.body.TextOnSlider
  }
  if (req.file) {
    //remove the previous image from the storage
    oldImage = await Slider.findOne({ _id: id })
    console.log(oldImage)
    removeOldImage();
    //then add the new one
    var file = req.file
    const { path } = file;
    console.log(path)
    const uploader = await Cloudinary.uploads(path, 'Phash');
    console.log('uploader', uploader)
    fs.unlinkSync(path)
    sliderDetails.sliderImage = uploader.url
    sliderDetails.publicid = uploader.id
  }
  try {
    await Slider.findOneAndUpdate({ _id: id }, sliderDetails, { upsert: true });
    // console.log('res',result)
    req.flash('success', 'Slider Updated succesfully')
  } catch (error) {
    console.log(error)
    req.flash('ImageError', `An error ${error} occured during the image upload`)
  }

  res.redirect('/dashboard/sliders')
}

exports.sliderList = async (req, res, next) => {
  let pagename = 'slider'
  let result = await Slider.find({}).then(result => {
    if (result) {
      // console.log(result)
      return result
    }
    else {
      return `we couldnt fetch the content from the DB`
      // throw new Error
    }
  })
  // console.log('result', result)
  res.render('backend/slider', { title: 'Slider List', result, pagename })
}

exports.productEdit = async (req, res, next) => {
  let pagename = 'product'
  let ImageError = req.flash('imageError')
  let success = req.flash('success')
  let failure = req.flash('Failure')
  let id = req.params.id
  let result = await Products.findById(id)

  res.render('backend/products', { title: 'Edit', ImageError, success, failure, pagename, result, url: req.originalUrl })
}

exports.editProduct = async (req, res, next) => {
  let id = req.params.id
  let productDetails = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    size: req.body.size,
    category: req.body.category,
    productCollection: req.body.collection,
    tag: req.body.tag
  };

  if (req.files) {
    // console.log(req.files)
    oldImage = await ProductModel.findOne({ _id: id })
    if (req.files[0]) {
      try {
        cloud.v2.uploader.destroy(oldImage.publicid1, function (error, result) {
          if (error) {
            console.log(error)
          }
          console.log(("Removed image at", oldImage.productImage1), (" ==> status", result));
        })
      } catch (error) {
        console.log('the images couldnt not be deleted')
      }
    }

    if (req.files[1]) {
      try {
        console.log(oldImage)
        cloud.v2.uploader.destroy(oldImage.publicid2, function (error, result) {
          if (error) {
            console.log(error)
          }
          console.log(("Removed image at", oldImage.productImage2), (" ==> status", result));
        })
      } catch (error) {
        console.log('the images couldnt not be deleted')
      }
    }

    if (req.files[2]) {
      try {
        cloud.v2.uploader.destroy(oldImage.publicid3, function (error, result) {
          if (error) {
            console.log(error)
          }
          console.log(("Removed image at", oldImage.productImage3), (" ==> status", result));
        })
      } catch (error) {
        console.log('the images couldnt not be deleted')
      }
    }


    try {
      const uploader = async (path) => await Cloudinary.uploads(path, 'Phash');
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
  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, productDetails, { upsert: true })
    req.flash('success', 'Product Updated succesfully')
  } catch (error) {
    console.log(error)
    req.flash('failure', `An error ${error} occured, The upload wasnt succesful`)
  }
  res.redirect('/dashboard/products')
}