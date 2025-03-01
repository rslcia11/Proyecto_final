"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaExclamationTriangle, FaMapMarkerAlt, FaCamera, FaArrowLeft } from "react-icons/fa"
import "./CrearDenuncia.css"

const CrearDenuncia = () => {
  const navigate = useNavigate()
  const [neighborhoods, setNeighborhoods] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "" })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    post_type: "complaint",
    neighborhood_id: "",
    image_urls: "",
  })

  useEffect(() => {
    fetchNeighborhoods()
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("userToken")
    setIsAuthenticated(!!userToken)

    // Redirect if not authenticated
    if (!userToken) {
      alert("Debes iniciar sesión para crear una denuncia")
      navigate("/denuncias")
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
      // alert("Imágenes subidas correctamente");
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

      showNotification("Denuncia creada correctamente")
      setTimeout(() => {
        navigate("/denuncias")
      }, 2000)
    } catch (error) {
      console.error("Error en la solicitud:", error)
      alert(error.message || "Error al conectar con el servidor.")
    }
  }

  const showNotification = (message) => {
    setNotification({ show: true, message })
    setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)
  }

  return (
    <div className="crear-denuncia-container">
      <header className="crear-denuncia-header">
        <Link to="/denuncias" className="back-button">
          <FaArrowLeft /> Volver
        </Link>
        <h1>Crear Nueva Denuncia</h1>
      </header>

      <div className="crear-denuncia-content">
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
            {formData.image_urls && (
              <div className="image-preview">
                <p>{formData.image_urls.split(",").length} imágenes seleccionadas</p>
              </div>
            )}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Subiendo..." : "Crear Denuncia"}
            </button>
          </div>
        </form>
      </div>
      {notification.show && (
        <div className="notification-bubble">
          <div className="notification-content">
            <div className="notification-icon">✓</div>
            <p>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CrearDenuncia

