import React, { useState, useEffect } from 'react';
import './Denuncias.css';

const Denuncias = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Esto vendría de tu sistema de autenticación
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'complaint',
    imagenes: [],
    ubicacion: ''
  });

  useEffect(() => {
    // Simular carga de denuncias (esto se conectaría a tu API)
    const mockDenuncias = [
      {
        id: 1,
        titulo: 'Calle en mal estado',
        descripcion: 'La calle principal del barrio tiene varios baches que dificultan el tránsito',
        tipo: 'complaint',
        imagenes: ['https://example.com/imagen1.jpg'],
        ubicacion: 'Calle Principal y Segunda',
        estado: 'pending',
        usuario: {
          nombre: 'Juan Pérez',
          avatar: '/placeholder.svg?height=40&width=40'
        },
        fecha: '2024-02-14T10:30:00'
      },
      {
        id: 2,
        titulo: 'Evento comunitario: Limpieza del parque',
        descripcion: 'Únete a nosotros este sábado para limpiar el parque central',
        tipo: 'event',
        imagenes: ['https://example.com/imagen2.jpg'],
        ubicacion: 'Parque Central',
        estado: 'active',
        usuario: {
          nombre: 'María Gómez',
          avatar: '/placeholder.svg?height=40&width=40'
        },
        fecha: '2024-02-15T09:00:00'
      }
    ];
    setDenuncias(mockDenuncias);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar la denuncia
    console.log('Formulario enviado:', formData);
    setShowModal(false);
  };

  return (
    <div className="denuncias-page">
      <div className="sidebar">
        {isLoggedIn ? (
          <button 
            className="create-post-button"
            onClick={() => setShowModal(true)}
          >
            Crear Publicación
          </button>
        ) : (
          <div className="login-prompt">
            <p>Si desea realizar una denuncia, publicar un evento o noticia, cree una cuenta o inicie sesión.</p>
          </div>
        )}
      </div>

      <div className="denuncias-feed">
        <h1>Denuncias y Eventos de la Comunidad</h1>
        
        <div className="denuncias-list">
          {denuncias.map(denuncia => (
            <div key={denuncia.id} className="denuncia-card">
              <div className="denuncia-header">
                <div className="user-info">
                  <img 
                    src={denuncia.usuario.avatar || "/placeholder.svg"}
                    alt="Avatar" 
                    className="user-avatar"
                  />
                  <div>
                    <h3>{denuncia.usuario.nombre}</h3>
                    <span className="fecha">
                      {new Date(denuncia.fecha).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className={`estado ${denuncia.estado}`}>
                  {denuncia.estado}
                </span>
              </div>

              <h2>{denuncia.titulo}</h2>
              <p>{denuncia.descripcion}</p>

              {denuncia.imagenes && denuncia.imagenes.length > 0 && (
                <div className="imagenes-container">
                  {denuncia.imagenes.map((img, index) => (
                    <img 
                      key={index} 
                      src={img || "/placeholder.svg"} 
                      alt={`Imagen ${index + 1} de la publicación`} 
                      className="denuncia-imagen"
                    />
                  ))}
                </div>
              )}

              <div className="denuncia-footer">
                <span className="ubicacion">{denuncia.ubicacion}</span>
                <span className="tipo">{denuncia.tipo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            
            <h2>Crear Nueva Publicación</h2>
            <form onSubmit={handleSubmit} className="denuncia-form">
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipo">Tipo de Publicación</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="complaint">Denuncia</option>
                  <option value="event">Evento</option>
                  <option value="news">Noticia</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ubicacion">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="imagenes">Imágenes</label>
                <input
                  type="file"
                  id="imagenes"
                  name="imagenes"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Denuncias;