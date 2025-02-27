"use client"

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdReport } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import "./BarraDeNavegacion.css";

function BarraDeNavegacion() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-center">
          {!isLoggedIn && (
            <Link to="/" className="navbar-item">
              <AiOutlineHome className="nav-icon" />
              Inicio
            </Link>
          )}
          <Link to="/denuncias" className="navbar-item">
            <MdReport className="nav-icon" />
            Denuncias
          </Link>
          <Link to="/marketplace" className="navbar-item">
            <BiStore className="nav-icon" />
            Negocios
          </Link>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-item logout-button">
              <FiLogOut className="nav-icon" />
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" className="navbar-item login-button">
              <BiLogIn className="nav-icon" />
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BarraDeNavegacion;
