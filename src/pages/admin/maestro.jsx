import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/maestros.css"; // ✅ Importamos los estilos

const Maestros = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      {/* Título */}
      <h1 className="title">Maestros/as</h1>

      {/* Contenedor de botones */}
      <div className="buttonContainer">
        <button className="card">
          <FontAwesomeIcon icon={faUser} size="2x" class="icon"/>
          <p className="cardText">Crear maestro/a.</p>
        </button>

        <button className="card">
          <FontAwesomeIcon icon={faSearch} size="2x" class="icon"/>
          <p className="cardText">Consultar maestro/a.</p>
        </button>
      </div>
    </div>
  );
};

export default Maestros;
