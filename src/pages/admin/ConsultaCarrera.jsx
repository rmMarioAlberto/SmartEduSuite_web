import React from "react";
import "../../styles/ConsultaCarrera.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsultaCarreras = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
                    <FontAwesomeIcon icon={FaArrowLeft} size="lg" />
      </button>
      <h1 className="title">Carreras</h1>
      <div className="search-container">
        <input type="text" placeholder="Ingrese el nombre de una carrera." />
        <button className="search-button">🔍</button>
      </div>
      <table className="carrera-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carrera1</td>
            <td>Activa</td>
            <td>
              <button className="update-button">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td>Carrera2</td>
            <td>Activa</td>
            <td>
              <button className="update-button">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="update-button">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="update-button">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="update-button">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaCarreras;
