import React from "react";
import { IoArrowBack, IoSearch } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import "../../styles/indexCRUD.css";
import { useNavigate } from "react-router-dom";

const crudAlumno = () => {
    const navigate = useNavigate();
    return (
    <div className="container">

      {/* Botón de regreso */}
      <button onClick={() => navigate('/admin/dashboard')} className="backButton">
        <IoArrowBack />
      </button>

      {/* Título */}
      <h1 className="title">Alumno</h1>

      {/* Botones */}
      <div className="buttonContainer">
        <div className="button" onClick={() => navigate('/admin/crear-alumno')}>
          <FaBook className="icon" />
          <span className="buttonText">Crear nuevo alumno</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/consulta-alumno')}>
          <IoSearch className="icon" />
          <span className="buttonText">Consultar alumno</span>
        </div>
      </div>
    </div>
  );
};

export default crudAlumno;