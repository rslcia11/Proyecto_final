"use client"

import { useEffect, useState } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"
import "./Marketplace.css"

const Marketplace = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    setIsAuthenticated(!!token)

    const fetchMarketItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/marketplace")
        if (!response.ok) {
          throw new Error("Error al obtener los productos")
        }
        const data = await response.json()
        setMarketItems(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketItems()
  }, [])

  const filteredItems = marketItems.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <p>Cargando productos...</p>
  }

  return (
    <div className="marketplace-container">
      <header className="marketplace-header">
        <h1>Marketplace de la Comunidad</h1>
        <p className="subtitle">Compra y vende artículos en tu vecindario</p>
      </header>

      <div className="marketplace-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isAuthenticated ? (
          <button className="btn-create" onClick={() => setShowModal(true)}>
            <FaPlus /> Publicar Producto
          </button>
        ) : (
          <p className="warning-message">Inicia sesión para publicar un producto.</p>
        )}
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="marketplace-items">
          {filteredItems.map((item) => (
            <div key={item.idmarketplace} className="marketplace-item">
              <img
                src={item.photoUrl || item.filePath || "/placeholder.svg"}
                alt={item.title || "Producto"}
                className="marketplace-image"
              />
              <div className="item-details">
                <h3>{item.title || "Sin título"}</h3>
                <p className="item-description">{item.description || "Sin descripción"}</p>
                <p className="item-price">Precio: ${item.price || "Consultar"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No hay productos publicados en este momento.</p>
        </div>
      )}

      {/* Aquí iría el modal para crear un nuevo producto */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Publicar Nuevo Producto</h2>
            {/* Formulario para publicar un nuevo producto */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace

