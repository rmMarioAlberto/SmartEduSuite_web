import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addCarera, getCarreraById, updateCarrera } from '../../services/carreraServices';
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearCarrera = () => {
    const navigate = useNavigate();
    const { idCarrera } = useParams(); // Obtener el ID de la carrera de la URL

    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [status, setStatus] = useState("1");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser ();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos de la carrera si el ID está presente
    useEffect(() => {
        if (idCarrera) {
            const fetchCarrera = async () => {
                try {
                    const id = idUsuario;
                    const data = await getCarreraById(id, token, idCarrera, handleLogout);
                    setNombre(data.nombre);
                    setStatus(data.status.toString());
                } catch (error) {
                    setError(`Error al cargar los datos de la carrera: ${error.message}`);
                }
            };
            fetchCarrera();
        }
    }, [idCarrera, idUsuario, token, handleLogout]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!idUsuario || !token) {
            setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (idCarrera) { // Verificar si hay un ID de carrera
                // Si hay un ID, actualizar la carrera
                await updateCarrera(
                    idCarrera,
                    nombre,
                    status,
                    idUsuario,
                    token,
                    handleLogout
                );
            } else {
                // Si no hay ID, crear una nueva carrera
                await addCarera(
                    nombre,
                    status,
                    idUsuario,
                    token,
                    handleLogout
                );
            }

            // Si la operación es exitosa, redirigir a la lista de carreras
            navigate("/admin/consulta-carrera"); // Asegúrate de que la ruta sea correcta
        } catch (error) {
            setError(`Error al crear o actualizar la carrera: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Botón de regreso */}
            <button className="backButton-crear" onClick={() => navigate('/admin/crud-carreras')}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <h1 className="title">Crear carrera</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label className="label">
                    <label>Ingrese el nombre de la carrera:</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="DSM"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>

                <label className="label ">Seleccione el status:</label>
                <select
                    className="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>

                <div className="buttonContainer">
                    <button type="button" onClick={() => navigate(-1)} className="cancelButton">Cancelar</button>
                    <button 
                        type="submit" 
                        className="sendButton"
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
        </div>
    );
};

export default CrearCarrera;