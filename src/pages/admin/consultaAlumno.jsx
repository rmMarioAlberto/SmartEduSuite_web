import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
import { getAlumnos, searchAlumno } from "../../services/alumnoService";
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';
import "../../styles/Consulta.css"; // Asegúrate de tener este archivo de estilos

const ConsultaAlumno = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  const handleFetchAlumnos = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getAlumnos(idUsuario, token, handleLogout);
      setAlumnos(data);
    } catch (error) {
      setError(`Error al cargar alumnos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAlumnos = async () => {
    if (!idUsuario || !token || !searchTerm.trim()) {
      setError("Ingrese un término de búsqueda válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchAlumno(searchTerm, idUsuario, token, handleLogout);
      setAlumnos(data);
    } catch (error) {
      setError(`Error al buscar alumnos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAlumnos();
  }, []);

  return (
    <div className="container">
        {/* Botón de regreso */}
        <button onClick={() => navigate('/admin/crud-alumnos')} className="backButton">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>

        {/* Título */}
        <h1 className="title">Alumnos/as</h1>

        {/* Barra de búsqueda */}
        <div className="searchContainer">
            <input
                type="text"
                className="searchInput"
                placeholder="Ingrese el nombre del alumno o alumna."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="searchButton" onClick={handleSearchAlumnos}>
                <IoSearch size={20} color="white" />
            </button>
        </div>

        {/* Tabla de alumnos */}
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
                {loading ? (
                    <tr>
                        <td colSpan="6">Cargando alumnos...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="6">{error}</td>
                    </tr>
                ) : alumnos ? (
                    alumnos.length > 0 ? (
                        alumnos.map((alumno) => (
                            <tr key={alumno.idusuario}>
                                <td>{alumno.nombrecompletousuario}</td>
                                <td>{alumno.correousuario}</td>
                                <td>{alumno.nombregrupo}</td>
                                <td>{alumno.nombrecarrera}</td>
                                <td>{alumno.usuariostatus === 1 ? "Activo" : "Inactivo"}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/admin/crear-alumno/${alumno.idusuario}`)}
                                        className="updateButton"
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay alumnos disponibles</td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan="6">Presiona 'Cargar Alumnos' para ver la lista</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);


}
export default ConsultaAlumno;
