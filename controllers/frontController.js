const Products = require('../models/products')
const Cart = require('../models/cart')

exports.indexPage = (req, res, next) => {
    res.render('frontend/index', { title: 'Phash :: Home', });
};

exports.shopPage = async (req, res, next) => {
    let pageName = 'Shop';

    await Products.find({}).then((result) => {
        // console.log(result)
        if (result) {
            res.render('frontend/shop', { title: 'Phash :: Shop', pageName, result });
        }
        res.render('frontend/shop', { title: 'Phash :: Shop', pageName, result });
    })

};

exports.contactPage = (req, res, next) => {
    let pageName = 'contact';
    res.render('frontend/contact', { title: 'Phash :: Contact', pageName, });
};

exports.productPage = async (req, res, next) => {
    let path = req.path;
    console.log(path)
    // console.log("seesion", req.session)
    let pageName = 'shop';
    let subpageName = 'details';
    await Products.findById({ _id: req.params.id }).then((result) => {
        // console.log(result)
        res.render('frontend/product', { title: 'Phash :: Product', result, pageName, subpageName, path, });

    })



};

exports.addToCart = async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    // console.log("quantity", req.body.quantity)
    await Products.findById(productId, (err, result) => {
        // console.log(result)
        if (err) {
            return res.redirect(`/products/${productId}`)
        }
        console.log(typeof req.body.quantity)
        cart.add(result, result._id, +req.body.quantity, result.productPrice);
        // console.log(req.body.quantity)
        req.session.cart = cart;
        // console.log(cart.items)
        let arr = Object.entries(cart.items)
        let figureArr = [];
        let sumOfQuantity = 0;
        let totalPrice = 0;

        arr.forEach((data) => {
            let u = figureArr.push(data[1])
            // console.log("new array", figureArr)
        })
        let totalQuantity = figureArr.forEach((data) => {
            console.log("data", data.qty)
            return sumOfQuantity += data.qty
        })

        let individualPrice = figureArr.forEach((data) => {
            let calc = data.qty * data.pricePerOne
            return totalPrice += calc
        })
        // console.log('thorn', totalPrice)
        // console.log(sumOfQuantity)
        req.session.totalPrice = totalPrice;
        req.session.sumOfQuantity = sumOfQuantity
        console.log(req.session.cart)


        res.redirect(`/products/${productId}`);
    })
};

exports.cartPage = (req, res, next) => {
    let pageName = 'shop';
    let subpageName = 'shopping cart';
    const cart = req.session.cart
    // console.log(cart)
    if (cart == undefined) {
        res.render('frontend/cart', { title: 'Phash :: cart', pageName, subpageName, cart: cart, });
    }
    let arr = Object.entries(cart.items);
    let array = arr.map((doc) => {
        return doc[1];
    })

    let newArray = []
    let priceArray = []
    array.forEach(data => {
        newArray.push(data.item)
    })

    array.forEach(data => {
        let qty = data.qty
        let u = data.qty * data.pricePerOne
        priceArray.push({ u, qty })
    })

    let orderDetail = newArray.map(doc => {
        return {
            id: doc._id,
            productName: doc.productName,
            productImage1: doc.productImage1,
            productPrice: doc.productPrice,

        }
    })


    console.log("de", orderDetail)

    let priceDetails = priceArray.map(doc => {
        return {
            price: doc.u,
            qty: doc.qty
        }
    })
    req.session.orderDetail = orderDetail
    req.session.priceDetails = priceDetails

    // console.log("priceDetails", priceDetails)
    // console.log("orderDetails", orderDetail)
    // console.log("newArray", newArray)
    console.log(req.session)


    res.render('frontend/cart', { title: 'Phash :: cart', pageName, subpageName, cart: orderDetail, priceDetails });
};


exports.checkoutPage = (req, res, next) => {
    const cart = req.session.cart
    // console.log(" dettt",orderDetail)
    // console.log("seeesss", cart)
    let pageName = 'checkout';
    let subpageName = '';
    if (cart == undefined) {
        res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, });
    }

    let arr = Object.entries(cart.items);
    let array = arr.map((doc) => {
        return doc[1];
    })

    let newArray = []
    let priceArray = []
    array.forEach(data => {
        newArray.push(data.item)
    })

    array.forEach(data => {
        let qty = data.qty
        let u = data.qty * data.pricePerOne
        priceArray.push({ u, qty })
    })

   let orderDetail = newArray.map(doc => {
        return {
            id: doc._id,
            productName: doc.productName,
            productImage1: doc.productImage1,
            productPrice: doc.productPrice,

        }
    })


    console.log("de" ,orderDetail)

   let priceDetails = priceArray.map(doc => {
        return {
            price: doc.u,
            qty: doc.qty
        }
    })

    let price = priceArray.map(doc => {
        return {
        total : doc.u * doc.qty
        }
    })

    res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, cart: orderDetail, priceDetails, price });

};

exports.loginPage = (req, res, next) => {

    res.render('frontend/login', { title: 'Phash :: login', });
};

exports.registerPage = (req, res, next) => {


    let message = req.flash('userExist');
    res.render('frontend/register', { title: 'Phash :: register', message, });
};
