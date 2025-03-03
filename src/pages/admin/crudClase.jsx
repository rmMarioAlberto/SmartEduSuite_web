import "../../styles/indexCRUD.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLanguage } from "react-icons/fa";


const crudClase = () => {
    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      <h1 className="grupo-title">Clases</h1>
      <div className="buttonContainer">
            <button onClick={() => navigate('/admin/crear-clase')} className="card button">
                <FaLanguage size="2x" className="icon" />
                <p className="cardText">Crear clase</p>
          </button>
          <button onClick={() => navigate('/admin/Horario')} className="card button">
                <IoSearch className="icon" />
                <p className="cardText">Consultar grupo</p>
          </button>
        </div>
    </div>
  );
};

export default crudClase;
