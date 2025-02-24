import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/HorariosForm.css";

const Horario = () => {
  const navigate = useNavigate();

  // Datos de ejemplo (esto puede venir de una API o base de datos)
  const clases = [
    { materia: "Materia1.", grupo: "Grupo1.", maestro: "Maestro1.", salon: "Salón1.", dia: "Día1.", horario: "Horario1.", status: "Activa." },
    { materia: "", grupo: "", maestro: "", salon: "", dia: "", horario: "", status: "" },
    { materia: "", grupo: "", maestro: "", salon: "", dia: "", horario: "", status: "" },
    { materia: "", grupo: "", maestro: "", salon: "", dia: "", horario: "", status: "" },
    { materia: "", grupo: "", maestro: "", salon: "", dia: "", horario: "", status: "" },
    { materia: "", grupo: "", maestro: "", salon: "", dia: "", horario: "", status: "" }
  ];

  return (
    <div className="clase-container">
      <button onClick={() => navigate(-1)} className="backButton">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
        <h1 className="title">Clase</h1>
      
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Ingrese el nombre de la clase:" />
        <IoSearch className="search-icon" />
      </div>

      {/* Tabla de clases */}
      <div className="table-container">
        <table className="clase-table">
          <thead>
            <tr>
              <th>Materia:</th>
              <th>Grupo:</th>
              <th>Maestro:</th>
              <th>Salón:</th>
              <th>Día:</th>
              <th>Horario:</th>
              <th>Status:</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase, index) => (
              <tr key={index}>
                <td>{clase.materia}</td>
                <td>{clase.grupo}</td>
                <td>{clase.maestro}</td>
                <td>{clase.salon}</td>
                <td>{clase.dia}</td>
                <td>{clase.horario}</td>
                <td>{clase.status}</td>
                <td>
                  <button onClick={() => navigate('/admin/CrearClase')} className="update-button">Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horario;
