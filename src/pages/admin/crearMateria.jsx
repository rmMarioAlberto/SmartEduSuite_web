import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addMateria, updateMateria, getMateriaById } from "../../services/materiasServices";
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearMateria = () => {
    const navigate = useNavigate();
    const { idMateria } = useParams(); // Obtener el ID de la materia de la URL

    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [status, setStatus] = useState("1");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos de la materia si el ID está presente
    useEffect(() => {
        if (idMateria) {
            const fetchMateria = async () => {
                try {
                    const data = await getMateriaById(idMateria, idUsuario, token, handleLogout);
                    setNombre(data.nombre);
                    setStatus(data.status.toString());
                } catch (error) {
                    setError(`Error al cargar los datos de la materia: ${error.message}`);
                }
            };

            fetchMateria();
        }
    }, [idMateria, idUsuario, token, handleLogout]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario || !token) {
            setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (idMateria) {
                // Si hay un ID, actualizar la materia
                const message = await updateMateria(
                    nombre,
                    status,
                    idMateria,
                    idUsuario,
                    token,
                    handleLogout
                );
            } else {
                // Si no hay ID, crear una nueva materia
                const message = await addMateria(
                    nombre,
                    status,
                    idUsuario,
                    token,
                    handleLogout
                );
            }

            // Si la operación es exitosa, redirigir a la lista de materias
            navigate("/admin/consulta-materia");
        } catch (error) {
            setError(`Error al crear o actualizar la materia: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Botón de regreso */}
            <button className="backButton-crear" onClick={() => navigate('/admin/crud-materias')}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <h1 className="title">Crear materia</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label className="label">
                    Ingrese el nombre de la materia:
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>

                <label className="label">Seleccione el status:</label>
                <select
                    name="status"
                    id="status"
                    className="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>

                <div className="buttonContainer">
                    <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="submit" className="sendButton" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default CrearMateria;