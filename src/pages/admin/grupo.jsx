import "../../styles//Grupo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Grupo = () => {
    const navigate = useNavigate();

  return (
    <div className="grupo-container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="grupo-title">Grupo</h1>
      <div className="grupo-buttons">
        <div className="grupo-card">
          <IoSearch className="icon" />
          <p>Crear nuevo grupo</p>
        </div>
        <div className="grupo-card">
          <FaUsers className="icon" />
          <p>Consultar grupo</p>
        </div>
      </div>
    </div>
  );
};

export default Grupo;
