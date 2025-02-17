import React, { useEffect, useState } from "react";
import "./Marketplace.css"; // Asegúrate de tener los estilos definidos

const Marketplace = () => {
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("userToken"); // Cambiado a "userToken"

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchMarketItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/marketplace", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setMarketItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketItems();
  }, [token]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!token) {
    return (
      <div className="marketplace-container">
        <h2>Marketplace</h2>
        <p>Necesitas crear una cuenta para ver, comprar y vender productos.</p>
      </div>
    );
  }

  return (
    <div className="marketplace-container">
      <h2>Marketplace</h2>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : marketItems.length > 0 ? (
        <div className="marketplace-items">
          {marketItems.map((item) => (
            <div key={item.idmarketplace} className="marketplace-item">
              <h3>{item.title || item.description || "Sin título"}</h3>
              <img
                src={item.photoUrl || item.filePath || "/default-product.jpg"}
                alt={item.title || "Producto"}
                className="marketplace-image"
              />
              <p>Precio: ${item.price || "Consultar"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No hay productos publicados en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
