const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');
const addressRoute = require('./addressRoute');
const orderRoute = require('./orderRoute');
const productRoute = require('./productRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);
router.use('/category', categoryRoute);
router.use('/order', orderRoute);
router.use('/product', productRoute);

module.exports = router;