import type React from "react"
import { FaUsers, FaNewspaper, FaStore, FaHandshake } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./Home.css"

const Home: React.FC = () => {
  return (
    <div className="pagina-inicio">
      <header className="header">
        <nav>
          <img
            src="https://www.loja.gob.ec/files/noticias/2021/05/4_3.jpg"
            alt="Municipio de Loja Logo"
            className="logo"
          />
          <button className="btn-login">Iniciar Sesión</button>
        </nav>
      </header>
      <main>
        <section className="inicio">
          <div className="inicio-content">
            <h1>Conecta con tu comunidad en Loja</h1>
            <p className="subtitle">Descubre eventos locales, comparte recursos y construye una ciudad mejor juntos</p>
            <div className="cta-buttons">
              <Link to="/crear-usuario">
                <button className="btn-registro btn-unete">Únete Gratis</button>
              </Link>
              <Link to="/denuncias">
                <button className="btn-registro btn-explora">Explorar la comunidad</button>
              </Link>
            </div>
          </div>
          <div className="inicio-image">
            <img
              src="https://www.loja.gob.ec/files/noticias/2021/05/4_3.jpg"
              alt="Municipio de Loja Logo"
              className="logo"
            />
          </div>
        </section>

        <section className="beneficios">
          <h2>¿Por qué unirte a LojaComunidad?</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <FaUsers className="icono" />
              <h3>Conecta con tu barrio</h3>
              <p>Conoce a tus vecinos y participa en eventos locales</p>
            </div>
            <div className="beneficio-item">
              <FaNewspaper className="icono" />
              <h3>Mantente informado</h3>
              <p>Recibe noticias y actualizaciones relevantes de tu comunidad</p>
            </div>
            <div className="beneficio-item">
              <FaStore className="icono" />
              <h3>Marketplace local</h3>
              <p>Compra, vende e intercambia productos y servicios en tu área</p>
            </div>
            <div className="beneficio-item">
              <FaHandshake className="icono" />
              <h3>Mejora tu barrio</h3>
              <p>Colabora en proyectos comunitarios y haz la diferencia</p>
            </div>
          </div>
        </section>
        <section className="estadisticas">
          <div className="estadistica-item">
            <h3>10,000+</h3>
            <p>Lojanos conectados</p>
          </div>
          <div className="estadistica-item">
            <h3>50+</h3>
            <p>Barrios activos</p>
          </div>
          <div className="estadistica-item">
            <h3>500+</h3>
            <p>Eventos mensuales</p>
          </div>
        </section>

        <section className="testimonios">
          <h2>Lo que dicen nuestros miembros</h2>
          <div className="testimonios-grid">
            <div className="testimonio">
              <img src="/avatar1.jpg" alt="María" className="avatar" />
              <p>"Gracias a LojaComunidad, organicé una limpieza en mi barrio y conocí a vecinos increíbles."</p>
              <span>- María, Barrio Central</span>
            </div>
            <div className="testimonio">
              <img src="/avatar2.jpg" alt="Juan" className="avatar" />
              <p>"Vendí mi bicicleta en el marketplace y encontré un grupo de ciclismo local. ¡Genial!"</p>
              <span>- Juan, San Sebastián</span>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Únete a la comunidad de Loja hoy mismo</h2>
          <p>Más de 10,000 lojanos ya están conectados. ¡No te quedes fuera!</p>
          <Link to="/crear-usuario">
            <button className="btn-registro btn-unete">Crear mi cuenta gratis</button>
          </Link>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Acerca de</h4>
            <ul>
              <li>
                <Link to="/mission">Nuestra misión</Link>
              </li>
              <li>
              <Link to="/team">Equipo</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/terms">Términos de uso</Link>
              </li>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LojaComunidad. Todos los derechos reservados.</p>
        </div>
        <div className="footer-partners">
          <p>Powered by UIDE</p>
          <img src="https://repositorio.uide.edu.ec/image/logo-uide.png" alt="UIDE Logo" className="uide-logo" />
        </div>
      </footer>
    </div>
  )
}

export default Home