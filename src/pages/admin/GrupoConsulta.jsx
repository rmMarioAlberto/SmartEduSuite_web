import "../../styles/Grupo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GrupoConsulta = () => {
  const navigate = useNavigate();

  return (
    <div className="grupo-container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="grupo-title">Grupos</h1>
      <div className="grupo-search">
        <input type="text" className="input-search" placeholder="Ingrese el nombre de un grupo." />
        <IoSearch className="icon" />
      </div>
      <table className="grupo-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grupo1</td>
            <td>Carrera1</td>
            <td>Activo</td>
            <td><button className="update-button">Actualizar</button></td>
          </tr>
          {[...Array(7)].map((_, index) => (
            <tr key={index}>
              <td></td>
              <td></td>
              <td></td>
              <td><button className="update-button">Actualizar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrupoConsulta;
