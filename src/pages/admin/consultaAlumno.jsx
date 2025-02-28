import React from "react";
import { IoSearch } from "react-icons/io5"; // Icono de búsqueda
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/Consulta.css"; // Estilos de la página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Iconos de FontAwesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Icono de flecha izquierda

const consultaAlumno = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título. */}
      <h1 className="title">Alumno/as</h1>

      {/* Barra de búsqueda. */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del alumno o alumna."
        />
        <button className="searchButton">
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de alumno/as. */}
      <table className="Table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Grupo</th>
            <th>Carrera</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de ejemplo */}
          <tr>
            <td>Alumno1</td>
            <td>Correo1</td>
            <td>Grupo1</td>
            <td>Carrera1</td>
            <td>Activa</td>
            <td>
              <button onClick={() => navigate('/admin/crear-alumno')} className="updateButton">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td>Alumno2</td>
            <td>Correo2</td>
            <td>Grupo2</td>
            <td>Carrera2</td>
            <td>Activa</td>
            <td>
              <button className="updateButton">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default consultaAlumno;
