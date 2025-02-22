import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CrearClase = () => {
  const navigate = useNavigate();

  return (
    <div className="clase-container">
      <button onClick={() => navigate(-1)} className="backButton">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
      <h1 className="title">Crear clase</h1>
      <form className="form-container">
        <div className="left-section">
          <div className="form-group">
            <label>Ingrese el nombre de la materia:</label>
            <input type="text" placeholder="Materia." />
          </div>
          <div className="form-group">
            <label>Seleccione el grupo:</label>
            <select>
              <option>Grupo.</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seleccione al maestro:</label>
            <select>
              <option>Maestro.</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seleccione el salón:</label>
            <select>
              <option>Salón.</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seleccione el día:</label>
            <select>
              <option>Día.</option>
            </select>
          </div>
        </div>

        <div className="right-section">
          <div className="form-group">
            <label>Seleccione el horario:</label>
            <select>
              <option>Horario.</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select>
              <option>Status.</option>
            </select>
          </div>
        </div>
      </form>

      <div className="button-group">
        <button onClick={() => navigate(-1)} className="cancel-button">Cancelar</button>
        <button type="Submit" className="submit-button">Enviar</button>
      </div>
    </div>
  );
};

export default CrearClase;
