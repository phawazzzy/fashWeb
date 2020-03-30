const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middlewares/fileUpload');
const isloggedin = require('../middlewares/isloggedin')


const { dashboard,
    dashProduct,
    newProduct,
    orders,
    productList
} = require('../controllers/dashController');


const { indexPage,
    shopPage,
    contactPage,
    productPage,
    cartPage,
    checkoutPage,
    loginPage,
    registerPage,
    addToCart,
    cleanCart,
    paystackPay,
    paystackCallback,
    shopPageTag
} = require('../controllers/frontController');
/* GET home page. */
router.get('/', indexPage);
router.get('/shop', shopPage);
router.get('/contact', contactPage);
router.get('/products/:id', productPage);
router.get('/cart', cartPage);
router.get('/checkout', isloggedin, checkoutPage);
router.get('/login', loginPage);
router.get('/register', registerPage);
router.post('/add-to-cart/:id', addToCart);
router.post("/paystackPay", paystackPay)
router.get('/paystack/callback', paystackCallback)
router.get('/shop/:tag', shopPageTag)

router.get('/cleanCart', cleanCart);
router.post('/register/members', passport.authenticate('local.register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));

router.post('/login/members', passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


router.get('/dashboard/', dashboard);
router.get('/dashboard/product', dashProduct);
router.post('/post/dashboard/product', upload.array('productImage1'), newProduct);
router.get('/dashboard/orders', orders)
router.get('/dashboard/products', productList)

router.post('/postcart', (req, res, next) => {
    console.log(req.body.quantity)
    res.redirect('/cart')
})


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;
