const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const neighborhoodRoutes = require('./neighborhood.routes'); 
const marketplaceRoutes = require('./marketplace.routes');

router.use('/users', userRoutes);
router.use('/neighborhoods', neighborhoodRoutes);
router.use('/marketplace',marketplaceRoutes);

module.exports = router;
