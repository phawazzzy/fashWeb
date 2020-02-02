
exports.indexPage = (req, res, next) => {
    let logged = req.user;
    res.render('frontend/index', { title: 'Phash :: Home', logged });
};

exports.shopPage = (req, res, next) => {
    let pageName = 'Shop';
    res.render('frontend/shop', { title: 'Phash :: Shop', pageName });
};

exports.contactPage = (req, res, next) => {
    let pageName = 'contact';
    res.render('frontend/contact', { title: 'Phash :: Contact', pageName });
};

exports.productPage = (req, res, next) => {
    let path = req.path;
    console.log(path)
    let pageName = 'shop';
    let subpageName = 'details';
    res.render('frontend/product', { title: 'Phash :: Product', pageName, subpageName, path });
};

exports.cartPage = (req, res, next) => {
    let pageName = 'shop';
    let subpageName = 'shopping cart';
    res.render('frontend/cart', { title: 'Phash :: cart', pageName, subpageName });
};

exports.checkoutPage = (req, res, next) => {
    let pageName = 'checkout';
    let subpageName = '';
    res.render('frontend/checkout', { title: 'Phash :: Checkout', pageName, subpageName });
};

exports.loginPage = (req, res, next) => {
    res.render('frontend/login', { title: 'Phash :: login' });
};

exports.registerPage = (req, res, next) => {
    let message = req.flash('userExist');
    res.render('frontend/register', { title: 'Phash :: register', message });
};
