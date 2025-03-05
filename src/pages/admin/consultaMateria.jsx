import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5"; // Icono de búsqueda
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/Consulta.css"; // Estilos de la página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Iconos de FontAwesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Icono de flecha izquierda

import { getMateria, searchMateria } from "../../services/materiasServices";
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const ConsultaMateria = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [materias, setMaterias] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser ();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchMaterias = async () => {
    if (!idUsuario || !token) {
      setError('El ID del usuario y el token son requeridos');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await getMateria(idUsuario, token, handleLogout);
      setMaterias(data);
    } catch (error) {
      setError(`Error al cargar las materias: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMaterias = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMateria(searchTerm, idUsuario, token, handleLogout);
      setMaterias(data); // Actualiza el estado con los resultados de la búsqueda
    } catch (error) {
      setError(`Error al buscar la materia: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMaterias();
  }, []);

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate(-1)} className="backButton">
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchMaterias}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de materias. */}
      <table className="Table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre de la materia</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Cargando materias...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="3">{error}</td>
            </tr>
          ) : materias && materias.length > 0 ? (
            materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>{materia.nombre}</td>
                <td>{materia.status === 1 ? 'Activa' : 'Inactiva'}</td>
                <td>
                  <button onClick={() => navigate(`/admin/crear-materia/${materia.id}`)} className="updateButton">
                    Actualizar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No se encontraron materias.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaMateria;