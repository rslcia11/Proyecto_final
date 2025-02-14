const Marketplace = require('../models/marketplace.model');

/**
 * Obtener todos los productos del marketplace
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const getProducts = async (req, res) => {
    try {
        const products = await Marketplace.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtener un producto específico por ID
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const getProductById = async (req, res) => {
    try {
        const product = await Marketplace.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Crear un nuevo producto en el marketplace
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const createProduct = async (req, res) => {
    try {
        const { name, user_iduser, user_idneighborhood, description, image, price, product_status } = req.body;
        const newProduct = await Marketplace.create({ 
            name, 
            user_iduser, 
            user_idneighborhood, 
            description, 
            image, 
            price, 
            product_status 
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error completo:', error); // Para debug
        res.status(500).json({ 
            message: 'Error al crear producto',
            error: error.message 
        });
    }
};

/**
 * Actualizar un producto existente
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const updateProduct = async (req, res) => {
    try {
        const { name, description, image, price, product_status } = req.body;
        const product = await Marketplace.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        await product.update({ name, description, image, price, product_status });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Eliminar un producto del marketplace
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Marketplace.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        await product.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
};