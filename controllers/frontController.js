const Products = require('../models/products')
const Cart = require('../models/cart')
const _ = require('lodash');
const request = require('request');
const { initializePayment, verifyPayment } = require('../config/paystack')(request)
const Order = require('../models/orders')

exports.indexPage = async (req, res, next) => {
    let pageName = 'Home'
    let result2 = await Products.find({ 'category': 'women' });
    let result = await Products.find({ 'category': 'men' });
    let result3 = await Products.find({ 'category': 'kids' });

    //   console.log(women)
    res.render('frontend/index', { title: 'phash', result, result2, result3, pageName })

}

exports.shopPage = async (req, res, next) => {
    let pageName = 'Shop';

    let result = await Products.find({})
    res.render('frontend/shop', { title: 'Phash :: Shop', pageName, result });

};

exports.shopPageTag = async (req, res, next) => {
    let pageName = 'shop';

    let result = await Products.find({ 'category': req.params.tag })
    res.render('frontend/shop', { title: 'Phash :: shop', pageName, result })

}

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
    console.log(cart)
    if (cart == {} || req.session.cart == null || cart == undefined) {
        console.log('okkkkkaakakak')
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
    let pageName = 'checkout';
    let subpageName = '';
    if (cart == null) {
        console.log('empty cart')
        res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, cart });
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
        let u = data.pricePerOne
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
    console.log("ede", orderDetail)

    let priceDetails = priceArray.map(doc => {
        return {
            price: doc.u,
            qty: doc.qty,
            total: doc.u * doc.qty
        }
    })
    console.log(priceDetails)

    res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, cart: orderDetail, priceDetails });

};

exports.paystackPay = (req, res, next) => {
    let arr = Object.entries(req.session.cart.items);
    let array = arr.map((doc) => {
        return doc[1];
    })
    let newArray = []
    let priceArray = []
    array.forEach(data => {
        newArray.push(data.item._id)
    })
    array.forEach(data => {
        let qty = data.qty
        let u = data.pricePerOne
        priceArray.push({ u, qty })
    })

    let quantity = priceArray.map(doc => {
        return {
            qty: doc.qty
        }
    })
    console.log(req.body, newArray, quantity)
    const form = _.pick(req.body, ['amount', 'email', 'firstname', 'lastname', 'country', 'street1', 'street2', 'postcode', 'town', 'phone'])
    form.metadata = {
        firstname: form.firstname,
        lastname: form.lastname,
        country: form.country,
        street1: form.street1,
        street2: form.street2,
        postcode: form.postcode,
        town: form.town,
        phone: form.phonenum,
        email: form.email,
        products: newArray,
        qty: quantity
    }
    form.amount *= 100
    initializePayment(form, (error, body) => {
        if (error) {
            console.log(error)
            return res.render('frontend/paymenterror')
        }
        response = JSON.parse(body);
        console.log(body)
        res.redirect(response.data.authorization_url)
    });
}

exports.paystackCallback = (req, res, next) => {
    const ref = req.query.reference
    verifyPayment(ref, async (error, body) => {
        if (error) {
            console.log(error)
            return res.redirect('frontend/paymenterror');
        }
        response = JSON.parse(body);
        console.log(response)

        const newOrder = {
            paymentRef: response.data.reference,
            orderDetails: response.data.metadata,
            createdDate: response.data.created_at,
            paidDate: response.data.paid_at
            // products: response.data.metadata.products
        }

        console.log(newOrder)

        await Order.create(newOrder).then(result => {
            if (!result) {
                console.log('there was an error')
                res.redirect('/checkout')
            }
            console.log('saved')
            req.flash('saved', 'you order has been saved')
            res.redirect('/cleanCart')

        })

    })
}
exports.cleanCart = (req, res, next) => {
    req.session.cart = null
    req.session.sumOfQuantity = 0
    req.session.totalPrice = 0
    console.log(req.session.cart)
    res.redirect('/');
}

exports.loginPage = (req, res, next) => {
    let passwordError = req.flash('passwordError');
    let LoginError = req.flash('LoginError');

    res.render('frontend/login', { title: 'Phash :: login', passwordError, LoginError });
};

exports.registerPage = (req, res, next) => {
    let message = req.flash('userExist');
    res.render('frontend/register', { title: 'Phash :: register', message, });
};
