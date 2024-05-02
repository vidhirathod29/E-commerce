const express = require('express');
const router = express.Router();
const addressRoute = require('./addressRoute');
const authRoute = require('./authRoute');
const wishlistRoute = require('./wishlistRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);
router.use('/wishlist', wishlistRoute);

module.exports = router;