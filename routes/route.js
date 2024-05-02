const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const addressRoute = require('./addressRoute');
const categoryRoute = require('./categoryRoute');
const cartRoute = require('./cartRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);
router.use('/category', categoryRoute);
router.use('/cart', cartRoute);

module.exports = router;