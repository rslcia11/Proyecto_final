import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraDeNavegacion from "./components/BarraDeNavegacion";
import RegisterUser from "./pages/RegisterUser"; // Página de registro de usuarios
import Home from "./pages/Home"; // Página de inicio (crearemos este archivo)
import NotFound from "./pages/NotFound"; // Página 404

function App() {
  return (
    <Router>
      <BarraDeNavegacion /> {/* La barra estará presente en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-usuario" element={<RegisterUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
