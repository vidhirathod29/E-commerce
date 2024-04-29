const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');

router.use('/user', authRoute);
router.use('/category', categoryRoute);

module.exports = router;