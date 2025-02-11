"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PublishProduct.css"

const PublishProduct = () => {
  const [description, setDescription] = useState("")
  const [idbusiness, setIdbusiness] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("available")
  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      setMessage("Debes iniciar sesión para publicar un producto.")
      return
    }

    if (!photo) {
      setMessage("Debes subir una imagen del producto.")
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append("description", description)
    formData.append("idbusiness", idbusiness)
    formData.append("price", price)
    formData.append("status", status)
    formData.append("photo", photo)

    try {
      const response = await fetch("http://localhost:3000/marketplace", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al publicar el producto.")
      }

      await response.json()
      setMessage("Producto publicado exitosamente.")
      setDescription("")
      setIdbusiness("")
      setPrice("")
      setStatus("available")
      setPhoto(null)
      navigate("/marketplace")
    } catch (error) {
      setMessage(error.message || "Error de conexión.")
      console.error("Error publicando producto:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="publish-product-container">
      <h2>Publica tu producto</h2>
      {message && <p className={`message ${message.includes("exitosamente") ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="idbusiness">ID del negocio:</label>
          <input
            id="idbusiness"
            type="number"
            value={idbusiness}
            onChange={(e) => setIdbusiness(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="available">Disponible</option>
            <option value="sold out">Agotado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Foto del Producto:</label>
          <input id="photo" type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Publicando..." : "Publicar Producto"}
        </button>
      </form>
    </div>
  )
}

export default PublishProduct

