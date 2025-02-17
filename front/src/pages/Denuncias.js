import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaMapMarkerAlt, FaCamera, FaVideo, FaSearch, FaPlus, FaComments, FaThumbsUp } from "react-icons/fa";
import "./Denuncias.css";

const Denuncias = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Verificar autenticación

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    post_type: "complaint",
    neighborhood_id: "",
    image_urls: [],
    video_url: "",
  });

  useEffect(() => {
    fetchDenuncias();
    fetchNeighborhoods();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("userToken");
    setIsAuthenticated(!!userToken);
  };

  const fetchDenuncias = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw new Error("Error al obtener las denuncias");
      }
      const data = await response.json();
      setDenuncias(data); 
    } catch (error) {
      console.error("Error al cargar denuncias:", error);
    }
  };
  

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch("http://localhost:3000/neighborhoods"); 
      if (!response.ok) {
        throw new Error("Error al obtener los barrios");
      }
      const data = await response.json();
      setNeighborhoods(data);
    } catch (error) {
      console.error("Error al cargar barrios:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userToken = localStorage.getItem("userToken"); 
    const user = JSON.parse(localStorage.getItem("user")); 
  
    if (!userToken || !user) {
      alert("Error: Usuario no autenticado.");
      return;
    }
  
    console.log("User data:", user);
    console.log("User ID enviado:", user.iduser); 
    
    const denunciaData = {
      ...formData,
      user_id: user.iduser
    };
  
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(denunciaData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(`Error al crear la denuncia: ${data.error || "Inténtalo de nuevo."}`);
      } else {
        alert("Denuncia creada correctamente.");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor.");
    }
  };
  
  
  
  
  
  const filteredDenuncias = denuncias.filter(
    (denuncia) =>
      denuncia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      denuncia.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Mostrar botón solo si el usuario está autenticado */}
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
            <h3>{denuncia.title}</h3>
            <p>{denuncia.description}</p>
            <div className="denuncia-meta">
              <span className="location">
                <FaMapMarkerAlt />
                {neighborhoods.find(n => n.idneighborhood === denuncia.neighborhood_id)?.name || "Barrio desconocido"}
              </span>
              <span className="date">{new Date(denuncia.created_at).toLocaleDateString()}</span>
            </div>
            <div className="denuncia-actions">
              <button className="btn-action">
                <FaThumbsUp /> 0 Apoyos
              </button>
              <button className="btn-action">
                <FaComments /> 0 Comentarios
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                />
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
                <button type="submit" className="btn-submit">
                  Crear Denuncia
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Denuncias;
