const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');
const productRoute = require('./productRoute');
const addressRoute = require('./addressRoute');
const wishlistRoute = require('./wishlistRoute');

router.use('/user', authRoute);
router.use('/product', productRoute);
router.use('/address', addressRoute);
router.use('/category', categoryRoute);
router.use('/wishlist', wishlistRoute);

module.exports = router;