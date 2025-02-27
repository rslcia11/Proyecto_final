"use client"

import { useEffect, useState } from "react"
import { FaPlus, FaSearch, FaTag, FaFileImage, FaDollarSign, FaBoxOpen } from "react-icons/fa"
import "./Marketplace.css"

const Marketplace = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  // 🔹 Estado para el formulario de nuevo producto
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  })

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
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
  }

  // 🔹 Manejar selección de imagen
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // 🔹 Enviar el producto al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Debes iniciar sesión para publicar un producto.");
        return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("user_iduser", user.iduser);
    formData.append("user_idneighborhood", user.idneighborhood);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    
    console.log("Datos enviados al backend:", Object.fromEntries(formData.entries()));
    
    const response = await fetch("http://localhost:3000/marketplace", {
      method: "POST",
      body: formData,
    });
    
    try {
        const response = await fetch("http://localhost:3000/marketplace", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al publicar el producto");
        }

        const newItem = await response.json();
        setMarketItems([...marketItems, newItem]);
        setShowModal(false);
        setProductData({ name: "", description: "", price: "" });
        setSelectedFile(null);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al publicar el producto.");
    }
};


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
                alt={item.name || "Producto"}
                className="marketplace-image"
              />
              <div className="item-details">
                <h3>{item.name || "Sin título"}</h3>
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

      {/* 🔹 Modal para publicar un nuevo producto */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>📦 Publicar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
              <label><FaTag /> Nombre del producto:</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />

              <label>📄 Descripción:</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
              />

              <label><FaDollarSign /> Precio:</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
              />

              <label><FaFileImage /> Imágenes:</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
              />

              <button className="btn-submit" type="submit">📢 PUBLICAR PRODUCTO</button>
              <button className="btn-cancel" type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace
