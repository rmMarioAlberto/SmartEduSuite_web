import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MaestroForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const crearMaestro = () => {
  const navigate = useNavigate();

  return (
    <div className="maestro-container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Maestro/a</h1>
      <form className="form-container">
        <div className="form-group">
          <label>Ingrese el nombre del maestro/a:</label>
          <input type="text" placeholder="Nombre." />
        </div>
        <div className="form-group">
          <label>Ingrese el apellido paterno:</label>
          <input type="text" placeholder="Apellido paterno." />
        </div>
        <div className="form-group">
          <label>Ingrese el apellido materno:</label>
          <input type="text" placeholder="Apellido materno." />
        </div>
        <div className="form-group">
          <label>Ingrese el correo:</label>
          <input type="email" placeholder="Correo." />
        </div>
        <div className="form-group">
          <label>Ingrese la información de la huella digital:</label>
          <select>
            <option>Huella.</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate(-1)} className="cancel-button">Cancelar</button>
        <button className="submit-button">Enviar</button>
      </div>
    </div>
  );
};

export default crearMaestro;
