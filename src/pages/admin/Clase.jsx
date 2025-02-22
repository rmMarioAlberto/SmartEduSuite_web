import "../../styles/Grupo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLanguage } from "react-icons/fa";


const Clase = () => {
    const navigate = useNavigate();

  return (
    <div className="grupo-container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="grupo-title">Clases</h1>
      <div className="grupo-buttons">
        <div className="grupo-card">
            <button onClick={() => navigate('/admin/CrearClase')} className="card">
                <FaLanguage className="icon" />
                <p>Crear clase</p>
          </button>
        </div>
        <div className="grupo-card">
            <button onClick={() => navigate('/admin/Horario')} className="card">
                <IoSearch className="icon" />
                <p>Consultar grupo</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clase;
