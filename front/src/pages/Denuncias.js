"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FaMapMarkerAlt,
  FaSearch,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaCamera,
  FaExclamationCircle,
  FaTrash,
} from "react-icons/fa"
import "./Denuncias.css"

const Denuncias = () => {
  const [denuncias, setDenuncias] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchDenuncias()
    fetchNeighborhoods()
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("userToken")
    setIsAuthenticated(!!userToken)
  }

  const fetchDenuncias = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts")
      if (!response.ok) {
        throw new Error("Error al obtener las denuncias")
      }
      const data = await response.json()
      setDenuncias(data)
    } catch (error) {
      console.error("Error al cargar denuncias:", error)
    }
  }

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch("http://localhost:3000/neighborhoods")
      if (!response.ok) {
        throw new Error("Error al obtener los barrios")
      }
      const data = await response.json()
      setNeighborhoods(data)
    } catch (error) {
      console.error("Error al cargar barrios:", error)
    }
  }

  const filteredDenuncias = denuncias.filter(
    (denuncia) =>
      denuncia.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      denuncia.description?.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleDeleteDenuncia = async (denunciaId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta denuncia?")) {
      return
    }

    const userToken = localStorage.getItem("userToken")
    try {
      const response = await fetch(`http://localhost:3000/posts/${denunciaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la denuncia")
      }

      // Update the list of denuncias
      setDenuncias(denuncias.filter((denuncia) => denuncia.id !== denunciaId))
    } catch (error) {
      console.error("Error al eliminar la denuncia:", error)
      alert("No se pudo eliminar la denuncia. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <div className="denuncias-container">
      <header className="denuncias-header">
        <h1>
          <FaExclamationTriangle /> Denuncias de la Comunidad
        </h1>
        <p className="subtitle">Mantente informado sobre los problemas en tu comunidad</p>
      </header>

      <div className="denuncias-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar denuncias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isAuthenticated ? (
          <Link to="/crear-denuncia" className="btn-create">
            <FaPlus /> Crear Publicación
          </Link>
        ) : (
          <p className="warning-message">
            <FaExclamationCircle /> Inicia sesión para crear una denuncia.
          </p>
        )}
      </div>

      <div className="denuncias-list">
        {filteredDenuncias.map((denuncia) => {
          const currentUser = JSON.parse(localStorage.getItem("user"))
          const isOwner = currentUser && currentUser.iduser === denuncia.user_id

          return (
            <div key={denuncia.id} className="denuncia-card">
              <div className="denuncia-header">
                <h3>
                  <FaExclamationTriangle /> {denuncia.title}
                </h3>
                <span className="date">
                  <FaCalendarAlt /> {new Date(denuncia.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="denuncia-description">{denuncia.description}</p>
              {denuncia.image_urls && (
                <div
                  className={`denuncia-images-container ${
                    denuncia.image_urls.split(",").length === 1 ? "single-image" : ""
                  }`}
                >
                  {denuncia.image_urls.split(",").map((url, index, array) => (
                    <div key={index} className="denuncia-image-wrapper">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Imagen ${index + 1} de la denuncia`}
                        className="denuncia-image"
                        onClick={() => handleImageClick(denuncia.image_urls, index)}
                      />
                      {array.length > 1 && index === 0 && (
                        <span className="denuncia-image-count">
                          <FaCamera /> {array.length} imágenes
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="denuncia-footer">
                <span className="location">
                  <FaMapMarkerAlt />
                  {neighborhoods.find((n) => n.idneighborhood === denuncia.neighborhood_id)?.name ||
                    "Barrio desconocido"}
                </span>
                <div className="denuncia-actions">
                  {isOwner && (
                    <button onClick={() => handleDeleteDenuncia(denuncia.id)} className="btn-delete">
                      <FaTrash /> Eliminar
                    </button>
                  )}
                </div>
              </div>
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
              alt={`Imagen ${currentImageIndex + 1} de la denuncia`}
              className="full-size-image"
            />
            {selectedImage.length > 1 && (
              <div className="image-navigation">
                <button onClick={handlePrevImage} className="nav-button prev">
                  <FaChevronLeft />
                </button>
                <span className="image-counter">
                  <FaCamera /> {currentImageIndex + 1} / {selectedImage.length}
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

export default Denuncias

