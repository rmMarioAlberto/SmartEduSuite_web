import React from "react";
import { IoSearch } from "react-icons/io5"; // Icono de búsqueda
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/Consulta.css"; // Estilos de la página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Iconos de FontAwesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Icono de flecha izquierda

const consultaClase = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título. */}
      <h1 className="title">Clase</h1>

      {/* Barra de búsqueda. */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del salón."
        />
        <button className="searchButton">
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de salones. ;) */}
      <table className="Table">
        <thead>
          <tr>
            <th>Nombre del salón</th>
            <th>Edificio</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de ejemplo. */}
          <tr>
            <td>Salon1.</td>
            <td>Edificio1.</td>
            <td>Activa</td>
            <td>
              <button onClick={() => navigate('/admin/crear-materia')} className="updateButton">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td>Salon2.</td>
            <td>Edificio2.</td>
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

export default consultaClase;
