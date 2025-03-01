"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FaStore,
  FaMapMarkerAlt,
  FaSearch,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaTag,
  FaImage,
  FaPhone,
} from "react-icons/fa"
import "./Marketplace.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProducts()
    fetchNeighborhoods()
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("userToken")
    setIsAuthenticated(!!userToken)
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/marketplace`)
      if (!response.ok) {
        throw new Error("Error al obtener los productos")
      }
      const data = await response.json()
      console.log("Productos obtenidos:", data)
      setProducts(data)
    } catch (error) {
      console.error("Error al cargar productos:", error)
    }
  }

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch(`${API_URL}/neighborhoods`)
      if (!response.ok) {
        throw new Error("Error al obtener los barrios")
      }
      const data = await response.json()
      setNeighborhoods(data)
    } catch (error) {
      console.error("Error al cargar barrios:", error)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleImageClick = (urls, index) => {
    setSelectedImage(urls.split(","))
    setCurrentImageIndex(index)
  }

  const handleCloseImageModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : selectedImage.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < selectedImage.length - 1 ? prevIndex + 1 : 0))
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      return
    }

    const userToken = localStorage.getItem("userToken")
    try {
      const response = await fetch(`${API_URL}/marketplace/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el producto")
      }

      // Actualizar la lista de productos
      setProducts(products.filter((product) => product.idbusiness !== productId))
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      alert("No se pudo eliminar el producto. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <div className="marketplace-container">
      <header className="marketplace-header">
        <h1>
          <FaStore /> Marketplace de la Comunidad
        </h1>
        <p className="subtitle">Compra y vende artículos en tu vecindario</p>
      </header>

      <div className="marketplace-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={handleSearchChange} />
        </div>

        {isAuthenticated ? (
          <Link to="/create-product">
            <button className="btn-create">
              <FaPlus /> Publicar Producto
            </button>
          </Link>
        ) : (
          <p className="warning-message">Inicia sesión para publicar un producto.</p>
        )}
      </div>

      <div className="products-list">
        {filteredProducts.map((product) => {
          const currentUser = JSON.parse(localStorage.getItem("user"))
          const isOwner = currentUser && currentUser.iduser === product.user_iduser

          return (
            <div key={product.idbusiness} className="product-card">
              <div className="product-header">
                <h3>
                  <FaTag /> {product.name}
                </h3>
                <span className="price">
                  <FaDollarSign />
                  {product.price}
                </span>
              </div>
              <p className="product-description">{product.description}</p>
              {product.image && (
                <div className={`product-images-container ${product.image.includes(",") ? "" : "single-image"}`}>
                  {product.image.split(",").map((url, index, array) => (
                    <div key={index} className="product-image-wrapper">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Imagen ${index + 1} del producto`}
                        className="product-image"
                        onClick={() => handleImageClick(product.image, index)}
                        onError={(e) => {
                          console.error("Error al cargar la imagen:", url)
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                      {array.length > 1 && index === 0 && (
                        <span className="product-image-count">
                          <FaImage /> {array.length} imágenes
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="product-footer">
                <span className="location">
                  <FaMapMarkerAlt />
                  {neighborhoods.find((n) => n.idneighborhood === product.user_idneighborhood)?.name ||
                    "Barrio desconocido"}
                </span>
                <span className="date">{new Date(product.created_at).toLocaleDateString()}</span>
              </div>
              <div className="product-contact">
                <FaPhone /> Contacto: {product.contact}
              </div>
              {isOwner && (
                <div className="product-actions">
                  <button onClick={() => handleDeleteProduct(product.idbusiness)} className="btn-delete">
                    <FaTrash /> Eliminar
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={handleCloseImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseImageModal}>
              <FaTimes />
            </button>
            <img
              src={selectedImage[currentImageIndex] || "/placeholder.svg"}
              alt={`Imagen ${currentImageIndex + 1} del producto`}
              className="full-size-image"
            />
            {selectedImage.length > 1 && (
              <div className="image-navigation">
                <button onClick={handlePrevImage} className="nav-button prev">
                  <FaChevronLeft />
                </button>
                <span className="image-counter">
                  {currentImageIndex + 1} / {selectedImage.length}
                </span>
                <button onClick={handleNextImage} className="nav-button next">
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace

