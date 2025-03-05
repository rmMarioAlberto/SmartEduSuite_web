import React from "react";
import { IoSearch } from "react-icons/io5"; // Icono de búsqueda
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/Consulta.css"; // Estilos de la página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Iconos de FontAwesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Icono de flecha izquierda

const consultaMateria = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate('/admin/crud-materias')} className="backButton">
                          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título. */}
      <h1 className="title">Materia</h1>

      {/* Barra de búsqueda. */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre de la materia."
        />
        <button className="searchButton">
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de materias. ;) */}
      <table className="Table">
        <thead>
          <tr>
            <th>Nombre de la materia</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de ejemplo. */}
          <tr>
            <td>Materia1.</td>
            <td>Activa</td>
            <td>
              <button onClick={() => navigate('/admin/crear-materia')} className="updateButton">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td>Materia2.</td>
            <td>Inactiva</td>
            <td>
              <button className="updateButton">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default consultaMateria;
