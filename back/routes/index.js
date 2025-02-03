const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const neighborhoodsRoutes = require('./neighborhoods.routes');

router.use('/users', userRoutes);
router.use('/neighborhoods', neighborhoodsRoutes);

module.exports = router;
