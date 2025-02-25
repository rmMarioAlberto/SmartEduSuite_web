import "../../styles/Grupo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const crudMaestro = () => {
    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      <h1 className="title">Maestros/as</h1>
      <div className="buttonContainer">
        <button onClick={() => navigate('/admin/MaestroForm')} className="card button">
          <FontAwesomeIcon icon={faUser} size="2x" className="icon"/>
          <p className="cardText">Crear maestro/a.</p>
        </button>
        <button onClick={() => navigate('/admin/ConsultaMaestros')} className="card button">
          <FontAwesomeIcon icon={faSearch} size="2x" className="icon"/>
          <p className="cardText">Consultar maestro/a.</p>
        </button>
      </div>
    </div>
  );
};

export default crudMaestro;
