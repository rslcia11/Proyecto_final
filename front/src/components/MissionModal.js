import "./MissionModal.css"

const MissionModal = () => {
  return (
    <div className="mission-content">
      <h1>Nuestra Misión</h1>
      <p className="last-updated">Última actualización: 23 de febrero, 2025</p>

      <div className="mission-subsection">
        <h2>1. Propósito</h2>
        <p>
          LojaComunidad es una plataforma digital innovadora diseñada para fortalecer los lazos comunitarios en la
          hermosa ciudad de Loja, Ecuador. Nuestro propósito es crear un espacio virtual dinámico y acogedor que
          facilite la conexión, colaboración y participación activa de los ciudadanos lojanos en la vida de su
          comunidad.
        </p>
      </div>

      <div className="mission-subsection">
        <h2>2. Objetivos Principales</h2>
        <p>En LojaComunidad, nos enfocamos en los siguientes objetivos para mejorar la vida de nuestra comunidad:</p>
        <ul>
          <li>Fomentar una comunicación abierta y constructiva entre vecinos</li>
          <li>Promover y difundir eventos locales y actividades comunitarias enriquecedoras</li>
          <li>Facilitar el intercambio de recursos y servicios para fortalecer la economía local</li>
          <li>Impulsar iniciativas de mejora barrial que eleven la calidad de vida de todos</li>
          <li>Mantener a los ciudadanos informados sobre noticias y actualizaciones locales relevantes</li>
        </ul>
      </div>

      <div className="mission-subsection">
        <h2>3. Valores</h2>
        <p>Nuestros valores fundamentales guían todas nuestras acciones y decisiones en LojaComunidad:</p>
        <div className="values-grid">
          <div className="value-item">
            <h3>Transparencia</h3>
            <p>Promovemos la apertura y la honestidad en todas nuestras interacciones.</p>
          </div>
          <div className="value-item">
            <h3>Inclusividad</h3>
            <p>Valoramos y respetamos la diversidad de nuestra comunidad.</p>
          </div>
          <div className="value-item">
            <h3>Colaboración</h3>
            <p>Fomentamos el trabajo en equipo y la cooperación entre los ciudadanos.</p>
          </div>
          <div className="value-item">
            <h3>Innovación</h3>
            <p>Buscamos constantemente nuevas formas de mejorar y crecer como comunidad.</p>
          </div>
        </div>
      </div>

      <div className="mission-subsection">
        <h2>4. Visión a Largo Plazo</h2>
        <p>
          A través de LojaComunidad, aspiramos a construir una ciudad más unida, participativa y solidaria, donde cada
          lojano pueda contribuir significativamente al bienestar colectivo y al desarrollo sostenible de Loja. Juntos,
          estamos creando un futuro brillante para nuestra querida ciudad, estableciendo un modelo de comunidad digital
          que pueda inspirar a otras ciudades en Ecuador y más allá.
        </p>
      </div>

      <div className="mission-subsection">
        <h2>5. Compromiso con la Comunidad</h2>
        <p>
          Nos comprometemos a mantener LojaComunidad como un espacio seguro, respetuoso y constructivo para todos los
          ciudadanos de Loja. Trabajamos continuamente para mejorar nuestros servicios y adaptarnos a las necesidades
          cambiantes de nuestra comunidad.
        </p>
      </div>
    </div>
  )
}

export default MissionModal

