import React, { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../styles/Consulta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { getGrupos, searchGrupo } from "../../services/grupoService";
import { getUser, getToken } from "../../services/authService";

const ConsultaGrupo = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchGrupos = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getGrupos(idUsuario, token, handleLogout);
      setGrupos(data);
    } catch (error) {
      setError(`Error al cargar grupos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchGrupos = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchGrupo(searchTerm, idUsuario, token, handleLogout);
      setGrupos(data);
    } catch (error) {
      setError(`Error al buscar grupos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchGrupos();
  }, []);

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate('/admin/crud-grupos')} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Grupos</h1>
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del grupo."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchGrupos}>
          <IoSearch size={20} color="white" />
        </button>
      </div>
      <table className="Table">
        <thead>
          <tr>
            <th>Nombre del grupo</th>
            <th>Carrera</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Cargando grupos...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">{error}</td>
            </tr>
          ) : grupos && grupos.length > 0 ? (
            grupos.map((grupo) => (
              <tr key={grupo.grupoId}>
                <td>{grupo.grupoNombre}</td>
                <td>{grupo.carreraNombre}</td>
                <td>{grupo.status === 1 ? "Activa" : "Inactiva"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/crear-grupo/${grupo.grupoId}`)}
                    className="updateButton"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron grupos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaGrupo;