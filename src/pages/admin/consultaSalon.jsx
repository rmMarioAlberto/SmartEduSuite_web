import React, { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../styles/Consulta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getSalones, searchSalon } from "../../services/salonService"; // Asegúrate de que la ruta sea correcta
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const ConsultaSalon = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [salones, setSalones] = useState([]); // Inicializar como un array vacío
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser ();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchSalones = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getSalones(idUsuario, token, handleLogout);
      setSalones(data);
    } catch (error) {
      setError(`Error al cargar salones: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSalon = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchSalon(searchTerm, idUsuario, token, handleLogout);
      setSalones(data);
    } catch (error) {
      setError(`Error al buscar salones: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchSalones();
  }, []);

  return (
    <div className="container">
      {/* Botón de regreso. */}
      <button onClick={() => navigate('/admin/crud-salones')} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título. */}
      <h1 className="title">Salones</h1>

      {/* Barra de búsqueda. */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre del salón."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchSalon}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de salones. */}
      <table className="Table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre del salón</th>
            <th>Edificio</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Cargando salones...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">{error}</td>
            </tr>
          ) : salones.length > 0 ? (
            salones.map((salon) => (
              <tr key={salon.id}>
                <td>{salon.id}</td>
                <td>{salon.nombre}</td>
                <td>{salon.edificio}</td>
                <td>{salon.status === 1 ? "Activa" : "Inactiva"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/crear-salon/${salon.id}`)}
                    className="updateButton"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay salones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaSalon;