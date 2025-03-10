import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from '../../context/AuthContext';
import { getClases, searchClase } from "../../services/claseService"; // Asegúrate de que estas funciones estén implementadas
import "../../styles/Consulta.css";
import { getToken, getUser } from "../../services/authService";

const ConsultaClase = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  // Función para cargar clases
  const handleFetchClases = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getClases(idUsuario, token, handleLogout);
      setClases(data);
    } catch (error) {
      setError(`Error al cargar clases: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar clases
  const handleSearchClases = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchClase(searchTerm, idUsuario, token, handleLogout);
      // Accede a los datos correctamente
      setClases(response.data); // Cambiado aquí para acceder a response.data
    } catch (error) {
      setError(`Error al buscar clases: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchClases();
  }, []);

  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      {/* Título */}
      <h1 className="title">Clases</h1>

      {/* Barra de búsqueda */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre de la clase:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchClases}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de clases */}
      <table className="Table">
        <thead>
          <tr>
            <th>id</th>
            <th>Materia</th>
            <th>Grupo</th>
            <th>Maestro</th>
            <th>Salón</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8">Cargando clases...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8">{error}</td>
            </tr>
          ) : clases.length > 0 ? (
            clases.map((clase) => (
              <tr key={clase.idclase}>
                <td>{clase.idclase}</td>
                <td>{clase.nombremateria}</td>
                <td>{clase.gruponombre}</td>
                <td>{clase.nombremaestro}</td>
                <td>{clase.nombresalon} (edificio : {clase.nombreedificio})</td>
                <td>{['Sin dia',"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"][clase.diaclase]}</td>                
                <td>{clase.inicoclase} - {clase.finalclase}</td>
                <td>{clase.statusclase === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/crear-clase/${clase.idclase}`)}
                    className="updateButton"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay clases disponibles</td>
            </tr>
          )}
        </tbody>      </table>
    </div>
  );
};

export default ConsultaClase;