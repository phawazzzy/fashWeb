const Products = require('../models/products')
exports.indexPage = (req, res, next) => {

    let check = (req.user) ? console.log('user  in') : console.log('user not ')
    // console.log(._id)
    res.render('frontend/index', { title: 'Phash :: Home', });
};

exports.shopPage = async (req, res, next) => {
    let pageName = 'Shop';

    await Products.find({}).then((result) => {
        if (result) {
            res.render('frontend/shop', { title: 'Phash :: Shop', pageName, result});
        }
        res.render('frontend/shop', { title: 'Phash :: Shop', pageName, result});
    })

};

exports.contactPage = (req, res, next) => {


    let pageName = 'contact';
    res.render('frontend/contact', { title: 'Phash :: Contact', pageName, });
};

exports.productPage = async (req, res, next) => {
    // await Products.findById({ _id: req.params.id }).then((result) => {
    //     console.log(result)
    // })

    let path = req.path;
    console.log(path)
    let pageName = 'shop';
    let subpageName = 'details';
    res.render('frontend/product', { title: 'Phash :: Product', pageName, subpageName, path, });
};

exports.cartPage = (req, res, next) => {
    console.log(req.body.quantity)
    let pageName = 'shop';
    let subpageName = 'shopping cart';
    res.render('frontend/cart', { title: 'Phash :: cart', pageName, subpageName, });
};


exports.checkoutPage = (req, res, next) => {


    let pageName = 'checkout';
    let subpageName = '';
    res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, });
};

exports.loginPage = (req, res, next) => {

    res.render('frontend/login', { title: 'Phash :: login', });
};

exports.registerPage = (req, res, next) => {


    let message = req.flash('userExist');
    res.render('frontend/register', { title: 'Phash :: register', message, });
};
