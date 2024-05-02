const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const cartRoute = require('./cartRoute')

router.use('/user', authRoute);
router.use('/cart',cartRoute)

module.exports = router;