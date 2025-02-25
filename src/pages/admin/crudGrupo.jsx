import "../../styles/GrupoConsulta.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const crudGrupo = () => {
    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Grupo</h1>
      <div className="buttons">
        <div className="button" onClick={() => navigate('/admin/crear-grupo')}>          
          <IoSearch className="icon" />
          <p>Crear nuevo grupo</p>
        </div>
<<<<<<< HEAD
        <div onClick={() => navigate('/admin/GrupoConsulta')} className="button">
=======
        <div className="button"  onClick={() => navigate('/admin/consulta-grupo')}>
>>>>>>> 789eb9dc09632f50484eb360ab4a93935ff1e1fb
          <FaUsers className="icon" />
          <p>Consultar grupo</p>
        </div>
      </div>
    </div>
  );
};

export default crudGrupo;
