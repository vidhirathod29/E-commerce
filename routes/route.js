const express = require('express');
const router = express.Router();
const categoryRoute = require('./categoryRoute');

router.use('/category', categoryRoute);

module.exports = router;