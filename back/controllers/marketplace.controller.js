const Marketplace = require("../models/marketplace.model")
const User = require("../models/user.model")

/**
 * Obtener todos los productos del marketplace
 */
const getProducts = async (req, res) => {
  try {
    const products = await Marketplace.findAll()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Obtener un producto específico por ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Marketplace.findByPk(req.params.id)
    if (!product) return res.status(404).json({ message: "Producto no encontrado" })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Crear un nuevo producto en el marketplace
 */
const createProduct = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body)

    const { name, description, price, image, user_iduser, user_idneighborhood, contact } = req.body
    if (!user_iduser || !user_idneighborhood) {
      return res.status(400).json({ error: "Faltan datos obligatorios" })
    }

    const newProduct = await Marketplace.create({
      name,
      description,
      price,
      image,
      user_iduser,
      user_idneighborhood,
      contact,
    })

    console.log("Producto creado:", newProduct)

    res.status(201).json(newProduct)
  } catch (error) {
    console.error("Error al crear producto:", error)
    res.status(500).json({ error: "Error al crear el producto: " + error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, user_iduser, user_idneighborhood, contact } = req.body

    if (!user_iduser || !user_idneighborhood) {
      return res.status(400).json({ message: "user_iduser y user_idneighborhood son requeridos" })
    }

    const product = await Marketplace.findByPk(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    // Verificar que el usuario que intenta actualizar es el propietario del producto
    if (product.user_iduser !== req.user.iduser) {
      return res.status(403).json({ message: "No tienes permiso para actualizar este producto" })
    }

    await product.update({
      name,
      description,
      price,
      image,
      user_idneighborhood,
      contact,
    })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
/**
 * Eliminar un producto del marketplace
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Marketplace.findByPk(req.params.id)
    if (!product) return res.status(404).json({ message: "Producto no encontrado" })

    await product.destroy()
    res.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}