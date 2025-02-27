const Marketplace = require("../models/marketplace.model");
const User = require("../models/user.model");  // 🔥 IMPORTANTE: Importar el modelo correcto

/**
 * Obtener todos los productos del marketplace
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
 */
const createProduct = async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body);
        
        const { name, description, price, user_iduser, user_idneighborhood } = req.body;
        if (!user_iduser || !user_idneighborhood) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const newProduct = await Marketplace.create({ 
            name, 
            description, 
            price, 
            user_iduser, 
            user_idneighborhood 
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};


/**
 * Actualizar un producto existente
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
    createProduct,  // 🔥 Ahora la función correcta es `createProduct`
    updateProduct, 
    deleteProduct
};
