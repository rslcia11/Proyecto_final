const Neighborhood = require('../models/neighborhood.model');

const getNeighborhoods = async (req, res) => {
    try {
        const neighborhoods = await Neighborhood.findAll({
            attributes: ['idneighborhood', 'name'],
            order: [['name', 'ASC']]
        });
        res.json(neighborhoods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNeighborhoods };