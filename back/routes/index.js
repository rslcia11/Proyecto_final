const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const neighborhoodRoutes = require('./neighborhood.routes'); 

router.use('/users', userRoutes);
router.use('/neighborhoods', neighborhoodRoutes);

module.exports = router;
