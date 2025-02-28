import React, { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../styles/Consulta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getCarrera, searchCarrera } from "../../services/carreraServices";
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const ConsultaCarrera = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [carreras, setCarreras] = useState([]); // Inicializar como un array vacío
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser ();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchCarreras = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCarrera(idUsuario, token, handleLogout);
      setCarreras(data);
    } catch (error) {
      setError(`Error al cargar carreras: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCarrera = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchCarrera(searchTerm, idUsuario, token, handleLogout);
      setCarreras(data);
    } catch (error) {
      setError(`Error al buscar carreras: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCarreras();
  }, []);

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título. */}
      <h1 className="title">Carreras</h1>

      {/* Barra de búsqueda. */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre de la carrera."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchCarrera}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de carreras. */}
      <table className="Table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre de la carrera</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Cargando carreras...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="3">{error}</td>
            </tr>
          ) : carreras.length > 0 ? (
            carreras.map((carrera) => (
              <tr key={carrera.id}>
                <td>{carrera.id}</td>
                <td>{carrera.nombre}</td>
                <td>{carrera.status === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/crear-carrera/${carrera.id}`)}
                  >Actualizar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay carreras disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaCarrera;