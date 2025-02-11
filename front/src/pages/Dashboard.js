// src/pages/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Panel de Usuario</h1>
      </header>
      <main>
        <section className="denuncias">
          <h2>Denuncias</h2>
          <p>Aquí puedes ver las denuncias recientes de la comunidad.</p>
          {/* Puedes renderizar un componente o lista de denuncias */}
        </section>
        <section className="negocios">
          <h2>Negocios</h2>
          <p>Aquí puedes ver los negocios registrados en la comunidad.</p>
          {/* Puedes renderizar un componente o lista de negocios */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
