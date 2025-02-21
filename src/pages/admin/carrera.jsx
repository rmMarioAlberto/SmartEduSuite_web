import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/indexCRUDs.css"; // 

const Carrera = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      {/* Título */}
      <h1 className="title">Carrera</h1>

      {/* Contenedor de botones */}
      <div className="buttonContainer">
        <button className="button" onClick={() => navigate('/IndexCarrera')}>
          <FontAwesomeIcon icon={faUser} size="2x" class="icon"/>
          <p className="cardText">Crear carrera.</p>
        </button>

        <button className="button">
          <FontAwesomeIcon icon={faSearch} size="2x" class="icon"/>
          <p className="cardText">Consultar carrera.</p>
        </button>
      </div>
    </div>
  );
};

export default Carrera;
