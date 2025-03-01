"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaTag, FaMapMarkerAlt, FaCamera, FaDollarSign, FaUpload, FaTimes, FaPhone } from "react-icons/fa"
import "./EditProduct.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [neighborhoods, setNeighborhoods] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    neighborhood_id: "",
    image: "",
    contact: "",
  })

  useEffect(() => {
    fetchNeighborhoods()
    fetchProductDetails()
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        if (parsedUser && parsedUser.iduser) {
          setUser(parsedUser)
          console.log("User data fetched successfully:", parsedUser)
        } else {
          console.error("Invalid user data structure:", parsedUser)
          showNotification("Error: Datos de usuario inválidos. Por favor, inicie sesión nuevamente.", "error")
        }
      } else {
        console.error("No user data found in localStorage")
        showNotification("Error: No se encontraron datos de usuario. Por favor, inicie sesión nuevamente.", "error")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      showNotification("Error al obtener datos de usuario. Por favor, inicie sesión nuevamente.", "error")
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

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/marketplace/${id}`)
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del producto")
      }
      const data = await response.json()
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        neighborhood_id: data.user_idneighborhood,
        image: data.image,
        contact: data.contact,
      })
    } catch (error) {
      console.error("Error al cargar los detalles del producto:", error)
      showNotification("Error al cargar los detalles del producto", "error")
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
    console.log("Iniciando actualización del producto")

    if (!user || !user.iduser) {
      console.error("Datos de usuario no válidos:", user)
      showNotification("Error: Datos de usuario no válidos. Por favor, inicie sesión nuevamente.", "error")
      return
    }

    const userToken = localStorage.getItem("userToken")
    if (!userToken) {
      console.error("Token de usuario no encontrado")
      showNotification("Error: Token de usuario no encontrado. Por favor, inicie sesión nuevamente.", "error")
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        user_iduser: user.iduser,
        user_idneighborhood: formData.neighborhood_id,
        contact: formData.contact,
      }

      console.log("Datos del producto a enviar:", productData)

      const response = await fetch(`${API_URL}/marketplace/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(productData),
      })

      console.log("Respuesta del servidor (status):", response.status)

      const responseData = await response.json()
      console.log("Respuesta del servidor (body):", responseData)

      if (!response.ok) {
        throw new Error(responseData.error || "Error al actualizar el producto")
      }

      showNotification("Producto actualizado correctamente.", "success")
      setTimeout(() => navigate("/marketplace"), 2000)
    } catch (error) {
      console.error("Error detallado en la solicitud:", error)
      showNotification(error.message || "Error al conectar con el servidor.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  if (!user) {
    return <div>Cargando datos de usuario...</div>
  }

  return (
    <div className="edit-product-container">
      <h1>
        <FaTag /> Editar Producto
      </h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
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
            {isSubmitting ? "Actualizando..." : "Actualizar Producto"}
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

export default EditProduct

