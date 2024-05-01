const express = require('express');
const router = express.Router();
const addressRoute = require('./addressRoute');
const authRoute = require('./authRoute');
const productRoute = require('./productRoute');

router.use('/user', authRoute);
router.use('/product', productRoute);
router.use('/address', addressRoute);

module.exports = router;