import "../../styles/Grupo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const crudMaestro = () => {
    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      
      <h1 className="title">Maestros</h1>
      <div className="buttons">
        <div className="button" onClick={() => navigate('/admin/crear-maestro')}>
          <IoSearch className="icon" />
          <p>Registrar nuevo maestro</p>
        </div>
        <div className="button">
          <FaUsers className="icon" />
          <p>Consultar maestro</p>
        </div>
      </div>
    </div>
  );
};

export default crudMaestro;
