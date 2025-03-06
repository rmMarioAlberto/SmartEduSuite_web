import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const crearClase = () => {
  const navigate = useNavigate();

  return (
    <div className="column1">
      {/* Header */}
      <header className="header-crear">
        {/* Botón de regreso */}
        <button onClick={() => navigate('/admin/crud-clases')} className="backButton-crear">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        {/* Título */}
        <h1 className="title-crear">Crear clase</h1>
      </header>
      <label className="label">Ingrese el nombre de la materia:
        <input type="text" className="input" placeholder="Materia" required />
      </label>

      <div className="container-grid">
        {/* Columna 1 */}
        <div className="column1">
          <form className="form">

            <label className="label">Seleccione el grupo:</label>
            <select name="grupo" id="grupo" className="select" required>
              <option>Grupo</option>
            </select>
            <label className="label">Seleccione al maestro:</label>
            <select name="maestro" id="maestro" className="select" required>
              <option>Maestro</option>
            </select>
            <label className="label">Seleccione el salón:</label>
            <select name="salon" id="salon" className="select" required>
              <option>Salón</option>
            </select>
          </form>
        </div>

        {/* Columna 2 */}
        <div className="column2">
          <form className="form">
            <label className="label">Seleccione el día:</label>
            <select name="dia" id="dia" className="select" required>
              <option>Día</option>
            </select>
            <label className="label">Seleccione el horario:</label>
            <select name="horario" id="horario" className="select" required>
              <option>Horario</option>
            </select>
            <label className="label">Status:</label>
            <select name="status" id="status" className="select" required>
              <option>Status</option>
            </select>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="buttonContainer">
          <button type="button" className="cancelButton" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="sendButton">Enviar</button>
        </div>
      </footer>
    </div>
  );
};

export default crearClase;
