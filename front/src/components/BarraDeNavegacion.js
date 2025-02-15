import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BarraDeNavegacion.css";

function BarraDeNavegacion() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const loginFormRef = useRef(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      setLoggedUser(JSON.parse(user));
    }
  }, []);

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Guardar usuario
        setLoggedUser(data.user);
        setIsLoggedIn(true);
        setIsLoginVisible(false);
        console.log("Login exitoso, redirigiendo a su cuenta...");
        navigate("/denuncias");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión");
    }
  };

  const toggleLoginForm = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Eliminar usuario almacenado
      setIsLoggedIn(false);
      setLoggedUser(null);
      navigate("/");
    } else {
      setIsLoginVisible((prev) => !prev);
    }
  };

  const handleClickOutside = (event) => {
    if (isLoginVisible && loginFormRef.current && !loginFormRef.current.contains(event.target)) {
      setIsLoginVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLoginVisible]);

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        {isLoggedIn ? (
          <>
            <Link to="/denuncias" className="navbar-item">
              Denuncias
            </Link>
            <span className="navbar-divider" />
            <Link to="/marketplace" className="navbar-item">
              Negocios
            </Link>
            <span className="navbar-divider" />
            <button onClick={toggleLoginForm} className="navbar-item">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-item">
              Inicio
            </Link>
            <span className="navbar-divider" />
            <Link to="/denuncias" className="navbar-item">
              Denuncias
            </Link>
            <span className="navbar-divider" />
            <Link to="/marketplace" className="navbar-item">
              Negocios
            </Link>
            <span className="navbar-divider" />
            <Link to="/crear-usuario" className="navbar-item">
              Crear Usuario
            </Link>
            <span className="navbar-divider" />
            <button onClick={toggleLoginForm} className="navbar-item">
              Ingresar
            </button>
          </>
        )}
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <span className="welcome-message">Bienvenido, {loggedUser ? loggedUser.name : "Usuario"}</span>
        ) : (
          isLoginVisible && (
            <div className="login-form-overlay">
              <div className="login-form-container" ref={loginFormRef}>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Iniciar sesión</button>
                </form>
              </div>
            </div>
          )
        )}
      </div>
    </nav>
  );
}

export default BarraDeNavegacion;
