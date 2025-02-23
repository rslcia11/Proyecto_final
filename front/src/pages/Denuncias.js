"use client"

import { useState, useEffect } from "react"
import {
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaCamera,
  FaVideo,
  FaSearch,
  FaPlus,
  FaComments,
  FaThumbsUp,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import "./Denuncias.css"

const Denuncias = () => {
  const [denuncias, setDenuncias] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    post_type: "complaint",
    neighborhood_id: "",
    image_urls: "",
    video_url: "",
  })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setIsSubmitting(true)
    const userToken = localStorage.getItem("userToken")

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Error al subir ${file.name}`)
        }

        const data = await response.json()
        return data.url
      })

      const imageUrls = await Promise.all(uploadPromises)

      setFormData((prev) => ({
        ...prev,
        image_urls: imageUrls.join(","),
      }))

      alert("Imágenes subidas correctamente")
    } catch (error) {
      console.error("Error al subir las imágenes:", error)
      alert(`Error al subir las imágenes: ${error.message}`)
      e.target.value = ""
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userToken = localStorage.getItem("userToken")
    const user = JSON.parse(localStorage.getItem("user"))

    if (!userToken || !user) {
      alert("Error: Usuario no autenticado.")
      return
    }

    if (isSubmitting) {
      alert("Por favor espere mientras se suben las imágenes.")
      return
    }

    try {
      const denunciaData = {
        ...formData,
        user_id: user.iduser,
        image_urls: formData.image_urls || "",
      }

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(denunciaData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la denuncia")
      }

      alert("Denuncia creada correctamente.")
      setShowModal(false)
      fetchDenuncias()

      setFormData({
        title: "",
        description: "",
        post_type: "complaint",
        neighborhood_id: "",
        image_urls: "",
        video_url: "",
      })
    } catch (error) {
      console.error("Error en la solicitud:", error)
      alert(error.message || "Error al conectar con el servidor.")
    }
  }

  const filteredDenuncias = denuncias.filter(
    (denuncia) =>
      denuncia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      denuncia.description.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <div className="denuncias-container">
      <header className="denuncias-header">
        <h1>Denuncias de la Comunidad</h1>
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
          <button className="btn-create" onClick={() => setShowModal(true)}>
            <FaPlus /> Crear Publicación
          </button>
        ) : (
          <p className="warning-message">Inicia sesión para crear una denuncia.</p>
        )}
      </div>

      <div className="denuncias-list">
        {filteredDenuncias.map((denuncia) => (
          <div key={denuncia.id} className="denuncia-card">
            <div className="denuncia-header">
              <h3>{denuncia.title}</h3>
              <span className="date">{new Date(denuncia.created_at).toLocaleDateString()}</span>
            </div>
            <p className="denuncia-description">{denuncia.description}</p>
            {denuncia.image_urls && (
              <div
                className={`denuncia-images-container ${denuncia.image_urls.split(",").length === 1 ? "single-image" : ""}`}
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
                      <span className="denuncia-image-count">{array.length} imágenes</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="denuncia-footer">
              <span className="location">
                <FaMapMarkerAlt />
                {neighborhoods.find((n) => n.idneighborhood === denuncia.neighborhood_id)?.name || "Barrio desconocido"}
              </span>
              <div className="denuncia-actions">
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h2>Crear Nueva Denuncia</h2>
            <form onSubmit={handleSubmit} className="crear-denuncia-form">
              <div className="form-group">
                <label htmlFor="title">
                  <FaExclamationTriangle /> Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Título de la denuncia"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe el problema o situación"
                />
              </div>
              <div className="form-group">
                <label htmlFor="neighborhood_id">
                  <FaMapMarkerAlt /> Barrio
                </label>
                <select
                  id="neighborhood_id"
                  name="neighborhood_id"
                  value={formData.neighborhood_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona el barrio</option>
                  {neighborhoods.map((n) => (
                    <option key={n.idneighborhood} value={n.idneighborhood}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image_urls">
                  <FaCamera /> Imágenes
                </label>
                <input
                  type="file"
                  id="image_urls"
                  name="image_urls"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {isSubmitting && <p className="upload-status">Subiendo imágenes...</p>}
              </div>
              <div className="form-group">
                <label htmlFor="video_url">
                  <FaVideo /> URL del Video
                </label>
                <input
                  type="url"
                  id="video_url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  placeholder="URL del video (opcional)"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Subiendo..." : "Crear Denuncia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Denuncias

