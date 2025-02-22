import "../../styles/Salon.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Salon = () => {
    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      
      <h1 className="title">Salones</h1>
      <div className="buttons">
        <div className="button" onClick={() => navigate('/admin/crear-salon')}>
          <IoSearch className="icon" />
          <p>Registrar nuevo salón</p>
        </div>
        <div className="button">
          <FaUsers className="icon" />
          <p>Consultar salón</p>
        </div>
      </div>
    </div>
  );
};

export default Salon;
