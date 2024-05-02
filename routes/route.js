const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');
const wishlistRoute = require('./wishlistRoute');
const addressRoute = require('./addressRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);
router.use('/wishlist', wishlistRoute);
router.use('/category', categoryRoute);

module.exports = router;