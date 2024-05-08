const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');
const addressRoute = require('./addressRoute');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');
const wishlistRoute = require('./wishlistRoute');
const orderRoute = require('./orderRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);
router.use('/wishlist', wishlistRoute);
router.use('/order', orderRoute);

module.exports = router;