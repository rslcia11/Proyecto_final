const express = require('express');
const router = express.Router();
const { getNeighborhoods } = require('../controllers/neighborhood.controller');


router.get('/', getNeighborhoods);

module.exports = router;