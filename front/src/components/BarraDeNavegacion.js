import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BarraDeNavegacion.css';

function BarraDeNavegacion() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginFormRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'usuario' && password === 'contraseña') {
      setIsLoggedIn(true);
      setIsLoginVisible(false);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const toggleLoginForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleClickOutside = (event) => {
    if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
      setIsLoginVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <Link to ="/" className="navbar-item">Inicio</Link>
        <span className="navbar-divider" />
        <a href="#denuncias" className="navbar-item">Denuncias</a>
        <span className="navbar-divider" />
        <a href="#negocios" className="navbar-item">Negocios</a>
        <span className="navbar-divider" />
        <Link to="/crear-usuario" className="navbar-item">Crear Usuario</Link>
        <span className="navbar-divider" />
        <button onClick={toggleLoginForm} className="navbar-item">
          {isLoggedIn ? 'Cerrar sesión' : 'Ingresar'}
        </button>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <span className="welcome-message">Bienvenido, {username}</span>
        ) : (
          isLoginVisible && (
            <div className="login-form-overlay">
              <div className="login-form-container" ref={loginFormRef}>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
