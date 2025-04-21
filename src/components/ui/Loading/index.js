import React from 'react';
// import './Spinner.css'; // Importar los estilos CSS para el spinner
import './Loader.css'; // Archivo de estilos CSS para el componente Loader
// import LogoLeo from "@assets/images/generali-leo.gif"
import LogoLeo from "@assets/images/generali-gaec.gif"

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        {/* <LogoLeo /> */}
        {/* <img src={LogoLeo} alt="Loader" width={150} /> */}

        <span className="loader-text">Espere por favor...</span>
      </div>
    </div>
  );
};

export default Loader;