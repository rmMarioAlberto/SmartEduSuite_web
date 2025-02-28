// ConsultaMaestro.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
import { getMaestro, searchMaestro } from "../../services/maestroServices";
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';
import "../../styles/ConsultaMaestros.css";

const ConsultaMaestro = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [maestros, setMaestros] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser ();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchMaestros = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMaestro(idUsuario, token, handleLogout);
      setMaestros(data);
    } catch (error) {
      setError(`Error al cargar maestros: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMaestros = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMaestro(searchTerm, idUsuario, token, handleLogout);
      setMaestros(data);
    } catch (error) {
      setError(`Error al buscar maestros: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMaestros();
  }, []);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Maestros/as</h1>
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del maestro o maestra."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchMaestros}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de maestros */}
      <table className="teacherTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Status</th>
            <th>Huella</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Cargando maestros...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6">{error}</td>
            </tr>
          ) : maestros ? (
            maestros.length > 0 ? (
              maestros.map((maestro) => (
                <tr key={maestro.id}>
                  <td>{maestro.id}</td>
                  <td>{`${maestro.nombre} ${maestro.apellidoPa} ${maestro.apellidoMa}`}</td>
                  <td>{maestro.correo}</td>
                  <td>{maestro.status === 1 ? "Activo" : "Inactivo"}</td>
                  <td>{maestro.huella ? "Registrada" : "No registrada"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/crear-maestro/${maestro.id}`)}
                      className="updateButton"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay maestros disponibles</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="6">Presiona 'Cargar Maestros' para ver la lista</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaMaestro;