import React from "react";
import { IoSearch } from "react-icons/io5"; // Icono de búsqueda
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/ConsultaMaestros.css"; // Estilos de la página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Iconos de FontAwesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Icono de flecha izquierda

const MaestroConsulta = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="backButton">
                          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título */}
      <h1 className="title">Maestros/as</h1>

      {/* Barra de búsqueda */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del maestro o maestra."
        />
        <button className="searchButton">
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de maestros */}
      <table className="teacherTable">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Huella</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de ejemplo */}
          <tr>
            <td>Alumno1</td>
            <td>Correo1</td>
            <td>Carrera1</td>
            <td>Activa</td>
            <td>
              <button onClick={() => navigate('/admin/MaestroForm')} className="updateButton">Actualizar</button>
            </td>
          </tr>
          <tr>
            <td>Alumno2</td>
            <td>Correo2</td>
            <td>Carrera2</td>
            <td>Inactiva</td>
            <td>
              <button className="updateButton">Actualizar</button>
            </td>
          </tr>
          {/* Agrega más filas según sea necesario */}
        </tbody>
      </table>
    </div>
  );
};

export default MaestroConsulta;
