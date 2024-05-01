const express = require('express');
const router = express.Router();
const addressRoute = require('./addressRoute');
const authRoute = require('./authRoute');

router.use('/user', authRoute);
router.use('/address', addressRoute);

module.exports = router;