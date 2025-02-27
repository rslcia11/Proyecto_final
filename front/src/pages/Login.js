"use client"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import "./Login.css";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error en el login");
      } else {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage")); // 🔥 Forzar actualización de la UI
        navigate("/denuncias");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <FiLogIn className="login-icon" />
          <h2>Iniciar sesión</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            <FiLogIn className="button-icon" />
            Iniciar sesión
          </button>
        </form>
        <div className="register-link">
          <FiUserPlus className="register-icon" />
          <p>
            ¿No tienes una cuenta? <Link to="/crear-usuario">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
