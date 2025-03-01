import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraDeNavegacion from "./components/BarraDeNavegacion";
import RegisterUser from "./pages/RegisterUser"; // Página de registro de usuarios
import Home from "./pages/Home"; // Página de inicio (crearemos este archivo)
import NotFound from "./pages/NotFound"; // Página 404
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login"
import Marketplace from './pages/Marketplace';
import Denuncias from "./pages/Denuncias";
import TermsAndConditions from './components/TermsAndConditions';
import MissionModal from './components/MissionModal';
import TeamSection from "./components/TeamSection";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import CrearDenuncia from "./pages/CrearDenuncia";


function App() {
  return (
    <Router>
      <BarraDeNavegacion /> {/* La barra estará presente en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-usuario" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/mission" element={<MissionModal />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/crear-denuncia" element={<CrearDenuncia />} />
      </Routes>
    </Router>
  );
}

export default App;
