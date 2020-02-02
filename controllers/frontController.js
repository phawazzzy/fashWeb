
exports.indexPage = (req, res, next) => {
    const logged = req.user;
    let check = (req.user) ? console.log('user logged in') : console.log('user not logged')
    // console.log(logged._id)
    res.render('frontend/index', { title: 'Phash :: Home', logged });
};

exports.shopPage = (req, res, next) => {
    const logged = req.user;

    let pageName = 'Shop';
    res.render('frontend/shop', { title: 'Phash :: Shop', pageName, logged });
};

exports.contactPage = (req, res, next) => {
    const logged = req.user;

    let pageName = 'contact';
    res.render('frontend/contact', { title: 'Phash :: Contact', pageName, logged });
};

exports.productPage = (req, res, next) => {
    const logged = req.user;

    let path = req.path;
    console.log(path)
    let pageName = 'shop';
    let subpageName = 'details';
    res.render('frontend/product', { title: 'Phash :: Product', pageName, subpageName, path, logged });
};

exports.cartPage = (req, res, next) => {
    const logged = req.user;

    let pageName = 'shop';
    let subpageName = 'shopping cart';
    res.render('frontend/cart', { title: 'Phash :: cart', pageName, subpageName, logged });
};

exports.checkoutPage = (req, res, next) => {
    const logged = req.user;

    let pageName = 'checkout';
    let subpageName = '';
    res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName, logged });
};

exports.loginPage = (req, res, next) => {
    const logged = req.user;

    res.render('frontend/login', { title: 'Phash :: login', logged });
};

exports.registerPage = (req, res, next) => {
    const logged = req.user;

    let message = req.flash('userExist');
    res.render('frontend/register', { title: 'Phash :: register', message, logged });
};
