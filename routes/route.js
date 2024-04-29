const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const productRoute = require('./productRoute');

router.use('/user', authRoute);
router.use('/product', productRoute);

module.exports = router;