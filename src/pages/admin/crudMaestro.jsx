import "../../styles/indexCRUD.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser, FaSearch } from 'react-icons/fa'; // Importa FaUser y FaSearch

const CrudMaestro = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate('/admin/dashboard')} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      <h1 className="title">Maestros/as</h1>
      <div className="buttonContainer">
        <button onClick={() => navigate('/admin/crear-maestro')} className="card button">
          <FaUser size="2x" className="icon" /> {/* Usa FaUser */}
          <p className="cardText">Crear maestro/a.</p>
        </button>
        <button onClick={() => navigate('/admin/consulta-maestro')} className="card button">
          <FaSearch size="2x" className="icon" /> {/* Usa FaSearch */}
          <p className="cardText">Consultar maestro/a.</p>
        </button>
      </div>
    </div>
  );
};

export default CrudMaestro;