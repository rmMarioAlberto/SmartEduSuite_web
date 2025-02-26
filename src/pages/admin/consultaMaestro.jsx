import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getMaestro } from "../../services/maestroServices";
import { getUser, getToken } from "../../services/authService"; // Importar las funciones de authService
import "../../styles/ConsultaMaestros.css";

const ConsultaMaestro = () => {
  const navigate = useNavigate();
  const [maestros, setMaestros] = useState(null); // Inicializado como null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener el token y el id del usuario utilizando las funciones de authService
  const user = getUser(); // Obtener el usuario
  const token = getToken(); // Obtener el token
  const idUsuario = user?.id; // Extraer el id del usuario

  // Función para cargar los maestros
  const handleFetchMaestros = async () => {
    if (!idUsuario || !token) {
      setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Llamar al servicio getMaestro
      const data = await getMaestro(idUsuario, token);
      console.log("Datos de maestros recibidos:", JSON.stringify(data, null, 2));

      // Actualizar el estado con los datos obtenidos
      setMaestros(data);
    } catch (error) {
      console.error("Error al cargar maestros:", error);
      setError(`Error al cargar maestros: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>

      <h1 className="title">Maestros/as</h1>

      {/* Botón para cargar los maestros */}
      <button 
        onClick={handleFetchMaestros} 
        className="fetchButton"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cargar Maestros"}
      </button>

      {error && <div className="errorMessage">{error}</div>}

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
          {maestros ? (
            maestros.length > 0 ? (
              maestros.map((maestro) => (
                <tr key={maestro.id}>
                  <td>{`${maestro.nombre} ${maestro.apellidoPa} ${maestro.apellidoMa}`}</td>
                  <td>{maestro.correo}</td>
                  <td>{maestro.huella ? "Registrada" : "No registrada"}</td>
                  <td>{maestro.status === 1 ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/MaestroForm/${maestro.id}`)}
                      className="updateButton"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay maestros disponibles</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="5">Presiona 'Cargar Maestros' para ver la lista</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaMaestro;