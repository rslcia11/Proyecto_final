import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "./RegisterUser.css";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    idneighborhood: "",
    phone: "",
    password: "",
  });

  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/neighborhoods")
      .then((res) => res.json())
      .then((data) => setNeighborhoods(data))
      .catch((err) => console.error("Error fetching neighborhoods:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "idneighborhood" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8 || formData.password.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener entre 8 y 20 caracteres.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado exitosamente",
          text: "✔️",
          showConfirmButton: false,
          timer: 2000, // Se cierra automáticamente en 2 segundos
        });

        setFormData({
          name: "",
          last_name: "",
          email: "",
          idneighborhood: "",
          phone: "",
          password: "",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "No se pudo crear el usuario",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear el usuario. Por favor, intente de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="crear-usuario-container">
      <h2>Únete a LojaComunidad</h2>
      <p className="subtitle">Crea tu cuenta y conecta con tu comunidad</p>
      <form onSubmit={handleSubmit} className="crear-usuario-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser /> Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Fabian"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Martinez"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Correo Electronico"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Contacto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <FaLock /> Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Crea una contraseña segura (8-20 caracteres)"
            minLength="8"
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <label htmlFor="idneighborhood">
            <FaMapMarkerAlt /> Barrio
          </label>
          <select
            id="idneighborhood"
            name="idneighborhood"
            value={formData.idneighborhood}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu barrio</option>
            {neighborhoods.map((n) => (
              <option key={n.idneighborhood} value={n.idneighborhood}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Crear Cuenta
        </button>
      </form>
      <p className="terms-text">
        Al crear una cuenta, aceptas nuestros{" "}
        <a href="/terminos">Términos de Servicio</a> y{" "}
        <a href="/privacidad">Política de Privacidad</a>.
      </p>
    </div>
  );
};

export default RegisterUser;
