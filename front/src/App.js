import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraDeNavegacion from "./components/BarraDeNavegacion";
import RegisterUser from "./pages/RegisterUser"; // Página de registro de usuarios
import Home from "./pages/Home"; // Página de inicio (crearemos este archivo)
import NotFound from "./pages/NotFound"; // Página 404
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Denuncias from "./pages/Denuncias";

function App() {
  return (
    <Router>
      <BarraDeNavegacion /> {/* La barra estará presente en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-usuario" element={<RegisterUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/denuncias" element={<Denuncias />} />
      </Routes>
    </Router>
  );
}

export default App;
