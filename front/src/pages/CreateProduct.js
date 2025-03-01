"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaTag, FaMapMarkerAlt, FaCamera, FaDollarSign, FaUpload, FaTimes, FaPhone } from "react-icons/fa"
import "./CreateProduct.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

const CreateProduct = () => {
  const navigate = useNavigate()
  const [neighborhoods, setNeighborhoods] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    neighborhood_id: "",
    image: "",
    contact: "", // Nuevo campo para el número de contacto
  })

  useEffect(() => {
    fetchNeighborhoods()
  }, [])

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

        const response = await fetch(`${API_URL}/upload`, {
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
        console.log("Respuesta del servidor para la imagen:", data)
        return data.url
      })

      const imageUrls = await Promise.all(uploadPromises)
      console.log("URLs de imágenes recibidas:", imageUrls)

      setFormData((prev) => ({
        ...prev,
        image: imageUrls.join(","),
      }))

      showNotification("Imágenes subidas correctamente", "success")
    } catch (error) {
      console.error("Error al subir las imágenes:", error)
      showNotification(`Error al subir las imágenes: ${error.message}`, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userToken = localStorage.getItem("userToken")
    const user = JSON.parse(localStorage.getItem("user"))

    if (!userToken || !user) {
      showNotification("Error: Usuario no autenticado.", "error")
      return
    }

    if (isSubmitting) {
      showNotification("Por favor espere mientras se suben las imágenes.", "info")
      return
    }

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        user_iduser: user.iduser,
        user_idneighborhood: formData.neighborhood_id,
        contact: formData.contact, // Incluimos el número de contacto
      }

      console.log("Datos del producto a enviar:", productData)

      const response = await fetch(`${API_URL}/marketplace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el producto")
      }

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      showNotification("Producto publicado correctamente.", "success")
      setTimeout(() => navigate("/marketplace"), 2000)
    } catch (error) {
      console.error("Error en la solicitud:", error)
      showNotification(error.message || "Error al conectar con el servidor.", "error")
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div className="create-product-container">
      <h1>
        <FaTag /> Publicar Nuevo Producto
      </h1>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label htmlFor="name">
            <FaTag /> Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <FaTag /> Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe el producto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">
            <FaDollarSign /> Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Precio del producto"
            step="0.01"
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
          <label htmlFor="contact">
            <FaPhone /> Número de Contacto
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Número de teléfono"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">
            <FaCamera /> Imágenes
          </label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image"
              name="image"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="image" className="file-input-label">
              <FaUpload /> Seleccionar imágenes
            </label>
          </div>
          {isSubmitting && <p className="upload-status">Subiendo imágenes...</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Subiendo..." : "Publicar Producto"}
          </button>
        </div>
      </form>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => setNotification(null)} className="close-notification">
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  )
}

export default CreateProduct

