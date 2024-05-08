const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');
const productRoute = require('./productRoute');
const addressRoute = require('./addressRoute');
const cartRoute = require('./cartRoute');
const wishlistRoute = require('./wishlistRoute');
const reportRoute = require('./reportRoute');

router.use('/user', authRoute);
router.use('/product', productRoute);
router.use('/address', addressRoute);
router.use('/category', categoryRoute);
router.use('/cart', cartRoute);
router.use('/wishlist', wishlistRoute);
router.use('/report', reportRoute);

module.exports = router;