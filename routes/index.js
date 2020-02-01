const express = require('express');
const router = express.Router();
const { dashboard, 
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
router.get('/product', productPage);
router.get('/cart', cartPage);
router.get('/checkout', checkoutPage);
router.get('/login', loginPage);
router.get('/register', registerPage)


router.get('/dashboard/', dashboard);
router.post('/product', newProduct)

module.exports = router;
