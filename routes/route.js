const express = require('express');
const router = express.Router();
const addressRoute = require('./addressRoute');
const authRoute = require('./authRoute');
const cartRoute = require('./cartRoute')

router.use('/user', authRoute);
router.use('/cart',cartRoute)
router.use('/address', addressRoute);

module.exports = router;