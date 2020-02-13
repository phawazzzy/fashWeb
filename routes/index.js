const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middlewares/fileUpload');

const { dashboard,
    dashProduct,
    newProduct,
} = require('../controllers/dashController');


const { indexPage,
    shopPage,
    contactPage,
    productPage,
    cartPage,
    checkoutPage,
    loginPage,
    registerPage,
} = require('../controllers/frontController');
/* GET home page. */
router.get('/', indexPage);
router.get('/shop', shopPage);
router.get('/contact', contactPage);
router.get('/products/', productPage);
router.get('/cart', cartPage);
router.get('/checkout', checkoutPage);
router.get('/login', loginPage);
router.get('/register', registerPage);

router.post('/register/members', passport.authenticate('local.register', {
    successRedirect: '/',
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
// router.route('/dashboard/product')
//     .all()
//     .get(dashProduct)
//     .post(upload.array('productImage1'), newProduct)

router.post('/postcart', (req, res, next) => {
    console.log(req.body.quantity)
    res.redirect('/cart')
})


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;
