import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-and-conditions">
      <h1>Términos y Condiciones</h1>
      <p>Última actualización: [Fecha]</p>

      <h2>1. Términos</h2>
      <p>
        Al acceder a este sitio web, usted acepta estar sujeto a estos términos de servicio, todas las leyes y
        regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no
        está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio. Los materiales
        contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales
        aplicables.
      </p>

      <h2>2. Uso de la Licencia</h2>
      <p>
        Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio
        web de LojaComunidad solo para visualización transitoria personal y no comercial. Esta es la concesión de una
        licencia, no una transferencia de título, y bajo esta licencia usted no puede:
      </p>
      <ul>
        <li>modificar o copiar los materiales;</li>
        <li>
          usar los materiales para cualquier propósito comercial o para cualquier exhibición pública (comercial o no
          comercial);
        </li>
        <li>
          intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio web de
          LojaComunidad;
        </li>
        <li>eliminar cualquier copyright u otras notaciones de propiedad de los materiales; o</li>
        <li>transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor.</li>
      </ul>
      <p>
        Esta licencia terminará automáticamente si usted viola cualquiera de estas restricciones y puede ser terminada
        por LojaComunidad en cualquier momento. Al terminar su visualización de estos materiales o al finalizar esta
        licencia, debe destruir cualquier material descargado en su posesión, ya sea en formato electrónico o impreso.
      </p>

      {/* Add more sections as needed */}

      <h2>16. Cambios en los Términos de Servicio</h2>
      <p>
        Podemos revisar estos términos de servicio para el sitio web en cualquier momento sin previo aviso. Al usar este
        sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
      </p>

      <h2>17. Ley Aplicable</h2>
      <p>
        Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Ecuador y usted se somete
        irrevocablemente a la jurisdicción exclusiva de los tribunales en ese estado o localidad.
      </p>
    </div>
  )
}

export default TermsAndConditions

